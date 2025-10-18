export const SessionUser = {
  set: (val) => localStorage.setItem("users", JSON.stringify(val)),

  get: () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : undefined;
  },

  remove: () => localStorage.removeItem("users"),
};
