import { createStore } from "@/lib/createStore";
import { Direction } from "@/types/direction";
import { Language } from "@/types/language";

type State = {
  sidebarOpen: boolean;
  language: Language;
  direction: Direction;
};

type Actions = {
  updateSidebarOpen: (is: State["sidebarOpen"]) => void;
  updateLanguage: (value: State["language"]) => void;
  updateDirection: (value: State["direction"]) => void;
};

type Store = State & Actions;

const useStore = createStore<Store>(
  (set) => ({
    sidebarOpen: true,
    language: "fa",
    direction: "rtl",
    updateSidebarOpen: (is) =>
      set((state) => {
        state.sidebarOpen = is;
      }),
    updateLanguage: (value) =>
      set((state) => {
        state.language = value;
      }),
    updateDirection: (value) =>
      set((state) => {
        state.direction = value;
      }),
  }),
  {
    name: "layout",
  }
);

export { useStore };
