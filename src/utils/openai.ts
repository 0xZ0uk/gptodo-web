import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-RzcMAmr34nzpyF4NoVkWj9xF",
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

export const onSuggestionCompletion = async (task: string) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Please break down the following task into 3 smaller, manageable steps:\nTask: ${task}\nSteps:\n`,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.8,
    });

    const steps = response.data.choices[0]?.text?.trim().split("\n");
    return steps;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export const onDescriptionCompletion = async (task: string) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Please create a description, smaller than 255 characters, for the following task: ${task}`,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.8,
    });

    return response.data.choices[0];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export default openai;
