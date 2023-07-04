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

type SettingsActivePageStore = {
  settingsActivePage: string;
  setSettingsActivePage: (settingsActivePage: string) => void;
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

export const useSettingsActivePageStore = create(
  persist<SettingsActivePageStore>(
    (set) => ({
      settingsActivePage: "Account",
      setSettingsActivePage: (settingsActivePage: string) => set({ settingsActivePage }),
    }),
    {
      name: "settings-active-page"
    }
  )
);