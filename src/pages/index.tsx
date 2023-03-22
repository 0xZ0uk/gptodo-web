/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type NextPage } from "next";
import { api } from "~/utils/api";
import CreateTask from "~/components/CreateTask";
import { useUser } from "@clerk/nextjs";
import React from "react";
import type {
  ChatCompletionRequestMessageRoleEnum,
  ChatCompletionRequestMessage,
} from "openai";
import {
  onChatCompletion,
  onParseChatMessage,
  onParseChatMessageAction,
} from "~/utils/openai";
import Bubble from "~/components/Chat/Bubble";
import Layout from "~/components/Layout";
import useChatStore from "~/utils/stores";

const Chat: NextPage = () => {
  const { chat, input, onInputChange, onAddMessage, onClearChat } =
    useChatStore();

  // Adds new message to chat state
  const handleAddMessage = async (
    newMessages: ChatCompletionRequestMessage[],
    callback?: () => Promise<void>
  ) => {
    onAddMessage(newMessages);
    callback && (await callback());
  };

  // API Context Utils
  const utils = api.useContext();
  const { user } = useUser();

  // TRPC Utils

  const addTask = api.tasks.create.useMutation({
    async onSuccess() {
      await utils.tasks.getAll.invalidate();
    },
  });

  const handleActions = async (action: { type: string; payload: string[] }) => {
    switch (action.type) {
      case "create_task":
        await addTask.mutateAsync({
          task: action.payload[0],
          description: action.payload[1],
          userId: user.id,
        });
        console.log("task created");
        break;
      default:
        break;
    }
  };

  // Handle 'Submit' click
  const handleSubmit = async () => {
    await handleAddMessage([{ role: "user", content: input }], async () => {
      const response = await onChatCompletion([
        ...chat,
        { role: "user", content: input },
      ]).then(async (res) => {
        await handleAddMessage([
          {
            role: res.data.choices[0].message.role,
            content: res.data.choices[0].message.content,
          },
        ]);

        return res;
      });

      const action = onParseChatMessageAction(
        onParseChatMessage(response.data.choices[0].message).action
      );

      await handleActions(action);
    });
  };

  return (
    <Layout
      name="Chat"
      footer={
        <CreateTask
          value={input}
          onChangeInput={(value) => onInputChange(value)}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit}
        />
      }
    >
      <div className="flex h-full flex-col gap-4 overflow-y-auto py-4">
        {chat.slice(1).map((msg: ChatCompletionRequestMessage, i) => (
          <Bubble
            key={i}
            text={
              msg.role === "assistant"
                ? onParseChatMessage(msg).msg
                : msg.content
            }
            type={
              msg.role as Exclude<
                ChatCompletionRequestMessageRoleEnum,
                "system"
              >
            }
          />
        ))}
      </div>
    </Layout>
  );
};

export default Chat;
