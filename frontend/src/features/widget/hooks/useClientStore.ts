import { createStore } from "@/lib/createStore";
import { Message } from "@/types/types";
import { nanoid } from "nanoid";

type State = {
  isWidgetOpen: boolean;
  name: string;
  clientId: string | null;
  messages: Message[];
};

type Actions = {
  updateIsWidgetOpen: (is: State["isWidgetOpen"]) => void;
  updateName: (value: State["name"]) => void;
  updateMessages: (value: State["messages"]) => void;
  addMessage: (value: State["messages"][number]) => void;
};

type Store = State & Actions;

const useClientStore = createStore<Store>(
  (set) => ({
    isWidgetOpen: false,
    clientId: `client-${nanoid(10)}`,
    name: "",
    messages: [],
    updateIsWidgetOpen: (is) =>
      set((state) => {
        state.isWidgetOpen = is;
      }),
    updateName: (value) =>
      set((state) => {
        state.name = value;
      }),
    updateMessages: (value) =>
      set((state) => {
        state.messages = value;
      }),
    addMessage: (value) =>
      set((state) => {
        state.messages.push(value);
      }),
  }),
  {
    name: "client",
    skipPersist: true,
  }
);

export { useClientStore };
