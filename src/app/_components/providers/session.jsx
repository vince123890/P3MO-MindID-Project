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
          navigate("/dashboard");
        }, 600);
      },
      onError: () => {
        setStatus("unauthenticated");
      },
    });
  };

  const signout = () => {
    setStatus("unauthenticated");
    setSessionData(undefined);
    SessionUser.remove();
    SessionToken.remove();
    navigate("/auth/login");
  };

  const handleSwitchRole = (role) => {
    const session = sessionData;
    const user = { ...session.user, role };
    setSessionData({ ...session, user });
    SessionUser.set({ ...session, user });
    navigate("/dashboard");
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
