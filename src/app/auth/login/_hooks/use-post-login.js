import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { message } from "antd";

import { SessionUser } from "../../../../libs/localstorage";
import { SessionToken } from "../../../../libs/cookies";

const postLogin = async (payload) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (payload.username === "admin" && payload.password === "admin") {
        resolve({
          data: {
            access_token: "access_token",
            refresh_token: "refresh_token",
            user: {
              id: "1",
              name: "Ahmad Rio",
              role: "Admin",
              email: "admin@example.com",
            },
          },
        });
      } else {
        reject({
          error: "Invalid username or password",
        });
      }
    }, 1000);
  });
};

export const usePostLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["post-login"],
    mutationFn: async (payload) => await postLogin(payload),
    onSuccess: (res) => {
      SessionToken.set(res.data);
      SessionUser.set({ user: res.data.user });
      navigate(0);
    },
    onError: (error) => {
      message.error(error.error);
    },
  });
};
