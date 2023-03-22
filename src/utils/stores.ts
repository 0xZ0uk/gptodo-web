import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { ChatCompletionRequestMessage } from "openai";
import { configMessages } from "./openai";

interface ChatState {
  input: string;
  chat: ChatCompletionRequestMessage[];
  onInputChange: (value: string) => void;
  onAddMessage: (message: ChatCompletionRequestMessage[]) => void;
  onClearChat: () => void;
}

const useChatStore = create<ChatState>()(
  devtools(
    (set) => ({
      input: "",
      chat: [...configMessages],
      onInputChange: (value: string) =>
        set((state: ChatState) => ({ ...state, input: value })),
      onAddMessage: (message: ChatCompletionRequestMessage[]) =>
        set((state: ChatState) => {
          return { ...state, chat: [...state.chat, ...message] };
        }),
      onClearChat: () =>
        set((state: ChatState) => {
          return { ...state, chat: [...configMessages] };
        }, true),
    }),
    {
      name: "chat-storage",
    }
  )
);

export default useChatStore;
