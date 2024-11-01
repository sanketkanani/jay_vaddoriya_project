import create from "zustand";

export const useUserStore = create((set) => ({
  user: {
    user: {
      username: "",
      batches: [],
    },
  },
  updateUser: (user) => set((state) => ({ user: user })),
  removeAllUser: () =>
    set({
      user: {
        user: {
          username: "",
          batches: [],
        },
      },
    }),
}));
