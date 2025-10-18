import Cookies from "js-cookie";

export const SessionToken = {
  set: (val) => Cookies.set("token", JSON.stringify(val)),
  get: () => {
    const token = Cookies.get("token");
    if (!token) return undefined;
    return JSON.parse(token);
  },
  remove: () => Cookies.remove("token"),
};
