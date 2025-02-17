import { createStore } from "@/lib/createStore";
import { generateClientId } from "@/lib/utils";
import { Message } from "@/types/message";

type State = {
  isWidgetOpen: boolean;
  name: string;
  messages: Message[];
  clientId: string;
};

type Actions = {
  updateIsWidgetOpen: (is: State["isWidgetOpen"]) => void;
  updateName: (value: State["name"]) => void;
  updateMessages: (value: State["messages"]) => void;
  addMessage: (value: State["messages"][number]) => void;
  resetClientId: () => void;
};

type Store = State & Actions;

const useClientStore = createStore<Store>(
  (set) => ({
    isWidgetOpen: false,
    name: "",
    messages: [],
    clientId: generateClientId(),
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
    resetClientId: () =>
      set((state) => {
        state.clientId = generateClientId();
      }),
  }),
  {
    name: "client",
    skipPersist: true,
  }
);

export { useClientStore };
