import {
  type ChatCompletionRequestMessage,
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessageRoleEnum,
} from "openai";

const configuration = new Configuration({
  organization: "org-RzcMAmr34nzpyF4NoVkWj9xF",
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

export const onChatCompletion = async (
  messages: ChatCompletionRequestMessage[]
) =>
  await openai.createChatCompletion({
    messages,
    model: "gpt-3.5-turbo",
  });

const extractFunctionAndMessage: (str: string) => {
  action: string;
  msg: string;
} = (str: string) => {
  const regex = /Function:\s*([\w]+\([^)]*\))\s*\n\s*Message:\s*([\s\S]+)/;
  const match = str.match(regex);

  if (match) {
    return {
      action: match[1] || "",
      msg: match[2] || "",
    };
  } else {
    return {
      action: "",
      msg: str,
    };
  }
};

export const onParseChatMessage: (message: ChatCompletionRequestMessage) => {
  role: ChatCompletionRequestMessageRoleEnum;
  action: string;
  msg: string;
} = (message: ChatCompletionRequestMessage) => {
  const functionMsg = extractFunctionAndMessage(message.content);

  return {
    role: message.role,
    ...functionMsg,
  };
};

export const onParseChatMessageAction: (action: string) => {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: string[];
} = (action) => {
  // "Dog Walking", "Walk the dog for 30 minutes."
  const actionType = action.split("(")[0];
  const actionPayload = action
    .split("(")[1]
    .replace(")", "")
    .split(",")
    .map((p) => p.toString());

  return {
    type: actionType,
    payload: actionPayload,
  };
};
