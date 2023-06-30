import { create } from "zustand";
import { persist } from "zustand/middleware";

import { User } from "@/types/auth";

type SignedInStore = {
  signedIn: boolean;
  setSignedIn: (signedIn: boolean) => void;
};

type UserStore = {
  user?: User;
  updateUser: (user?: User) => void;
};

export const useSignedInStore = create(
  persist<SignedInStore>(
    (set) => ({
      signedIn: false,
      setSignedIn: (signedIn: boolean) => set({ signedIn }),
    }),
    {
      name: "signed-in",
    }
  )
);

export const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  updateUser: (user?: User) => set({ user }),
}));
