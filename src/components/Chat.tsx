import React from "react";
import Bubble from "./ChatUi/Bubble";

interface ChatProps {
  chat: { message: string; function: string }[];
  onMessageSend?: () => void;
}

const Chat: React.FC<ChatProps> = ({ chat }) => {
  const messages = chat;

  messages.shift();

  return (
    <div
      id="task-area"
      className="flex h-full flex-col gap-4 overflow-y-auto py-4"
    >
      <div className="flex flex-col gap-4">
        {messages.map((msg, i) => (
          <Bubble
            text={msg?.message}
            key={i}
            type={msg?.function === "user()" ? "user" : "assistant"}
          />
        ))}
      </div>
    </div>
  );
};

export default Chat;
