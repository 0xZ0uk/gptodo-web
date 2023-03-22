import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { ChatCompletionRequestMessage } from "openai";
import { configMessages } from "./openai";

interface ChatState {
  input: string;
  chat: ChatCompletionRequestMessage[];
  loading: boolean;
  onInputChange: (value: string) => void;
  onAddMessage: (message: ChatCompletionRequestMessage[]) => void;
  onClearChat: () => void;
  onToggleLoading: (value?: boolean) => void;
}

const useChatStore = create<ChatState>()(
  devtools(
    (set) => ({
      input: "",
      chat: [...configMessages],
      loading: false,
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
      onToggleLoading: (value?: boolean) =>
        set((state: ChatState) => ({
          ...state,
          loading: !!value ? value : !state.loading,
        })),
    }),
    {
      name: "chat-storage",
    }
  )
);

export default useChatStore;
