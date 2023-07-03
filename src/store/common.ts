import { create } from "zustand";
import {persist} from "zustand/middleware";

type LoadingStore = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

type ActivePageStore = {
  activePage: string;
  setActivePage: (activePage: string) => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));

export const useActivePageStore = create(
  persist<ActivePageStore>(
    (set) => ({
      activePage: "Dashboard",
      setActivePage: (activePage: string) => set({ activePage }),
    }),
    {
      name: "active-page"
    }
  )
);