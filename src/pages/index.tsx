import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import Header from "~/components/Header";
import CreateTask from "~/components/CreateTask";
import Tasks from "~/components/Tasks";
import { useUser } from "@clerk/nextjs";
import React from "react";
import {
  onDescriptionCompletion,
  onSuggestionCompletion,
} from "~/utils/openai";
import type { CreateCompletionResponseChoicesInner } from "openai";

const Home: NextPage = () => {
  const [inputValue, setInputValue] = React.useState<string>("");

  const utils = api.useContext();

  const { user } = useUser();

  const tasks = api.tasks.getAll.useQuery({ userId: user?.id || "" });

  const addTask = api.tasks.create.useMutation({
    async onSuccess() {
      await utils.tasks.getAll.invalidate();
    },
  });

  const addSuggestions = api.tasks.createSuggestions.useMutation({
    async onSuccess() {
      await utils.tasks.getAll.invalidate();
    },
  });

  const completeSuggestion = api.tasks.completeSuggestion.useMutation({
    async onSuccess() {
      await utils.tasks.getAll.invalidate();
    },
  });

  const handleCreateDescription = async (task: string) => {
    return await onDescriptionCompletion(task);
  };

  const handleCreateSuggestions = async (task: string) => {
    const suggests = await onSuggestionCompletion(task);

    return suggests;
  };

  const handleCompleteSuggestion = async (id: string, completed: boolean) => {
    await completeSuggestion.mutateAsync({
      id,
      completed,
    });
  };

  const handleSubmit = async () => {
    if (!!user) {
      const description = await handleCreateDescription(inputValue);

      const task = await addTask.mutateAsync({
        task: inputValue,
        description: (
          (description as CreateCompletionResponseChoicesInner).text as string
        )
          .trim()
          .split("\n")[0],
        userId: user.id,
      });

      const suggestionsCompletions = await handleCreateSuggestions(task.task);

      await addSuggestions.mutateAsync({
        tasks: suggestionsCompletions || [],
        taskId: task.id,
      });

      setInputValue("");
    }
  };

  return (
    <>
      <Head>
        <title>BitTask</title>
        <meta name="description" content="Achievable tasks." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-screen justify-center overflow-hidden bg-black">
        <div className="m-4 flex w-full flex-col rounded-md bg-white p-4">
          <Header />
          <Tasks
            tasks={tasks.data}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onCompleteSuggestion={handleCompleteSuggestion}
          />
          <CreateTask
            value={inputValue}
            onChangeInput={(value) => setInputValue(value)}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
