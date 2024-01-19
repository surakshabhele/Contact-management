import create from "zustand";

export const useAuthStore = create((set) => {
  let authToken = null;
  let user = null;

  if (typeof window !== "undefined") {
    authToken = window.localStorage.getItem("authToken") || null;

    let temp = window.localStorage.getItem("user") || null;
    if (temp) {
      user = JSON.parse(temp);
    }
    // set({ authToken: authToken, user: JSON.parse(user) });
  }

  return {
    deleteMultiple: false,
    authToken: authToken,
    user: user,
    setDeleteMultiple: (isDelete) => set(() => ({ deleteMultiple: isDelete })),
    setAuthToken: (token) => {
      window.localStorage.setItem("authToken", token);
      set(() => {
        return { authToken: token };
      });
    },
    setUser: (user) => {
      localStorage.setItem("user", JSON.stringify(user));
      set({ user });
    },
  };
});