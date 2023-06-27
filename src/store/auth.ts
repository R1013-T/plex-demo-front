import { create } from "zustand";
import { persist } from "zustand/middleware";

import { User } from "@/types/auth";

type AuthStore = {
  user?: User;
  updateUser: (user?: User) => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: undefined,
      updateUser: (user?: User) => set({ user }),
    }),
    {
      name: "auth-storage"
    }
  )
);
