import { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router";

import { usePostLogin } from "../../auth/login/_hooks/use-post-login";
import { SessionToken } from "../../../libs/cookies";
import { SessionUser } from "../../../libs/localstorage";

const SessionContext = createContext({
  signin: () => {},
  signout: () => {},
  switchRole: () => {},
  session: undefined,
  status: undefined,
});

const SessionProvider = ({ children }) => {
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState();
  const [status, setStatus] = useState();

  const { mutate: oidcMutate } = usePostLogin();

  useEffect(() => {
    const session = SessionToken.get();
    const user = SessionUser.get();

    if (session) {
      setSessionData({ ...session, ...user });
      setStatus("authenticated");
    } else {
      setStatus("unauthenticated");
    }
  }, []);

  const signin = (payload) => {
    setStatus("authenticating");
    oidcMutate(payload, {
      onSuccess: (res) => {
        setSessionData(res.data);

        setStatus("authenticated");

        SessionUser.set(res.data);

        setTimeout(() => {
          navigate("/project-anggota-holding");
        }, 600);
      },
      onError: () => {
        setStatus("unauthenticated");
      },
    });
  };

  const signout = (options = {}) => {
    try {
      setStatus("unauthenticated");
      setSessionData(undefined);
      SessionUser.remove();
      SessionToken.remove();
      
      // Safe navigation with fallback
      const redirectPath = typeof options?.callbackUrl === 'string' ? options.callbackUrl : "/auth/login";
      navigate(String(redirectPath));
    } catch (error) {
      console.warn("Error during signout:", error);
      // Fallback navigation
      window.location.href = "/auth/login";
    }
  };

  const handleSwitchRole = (role) => {
    try {
      if (!sessionData || !role) {
        console.warn("Invalid session data or role for switch");
        return;
      }
      
      const session = { ...sessionData };
      const user = { ...session.user, role: String(role) };
      const newSessionData = { ...session, user };
      
      setSessionData(newSessionData);
      SessionUser.set(newSessionData);
      navigate("/project-anggota-holding");
    } catch (error) {
      console.warn("Error switching role:", error);
    }
  };

  return (
    <SessionContext.Provider
      value={{
        session: sessionData,
        status,
        signin,
        signout,
        switchRole: handleSwitchRole,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};

export default SessionProvider;
