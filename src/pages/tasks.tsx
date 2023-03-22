import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Layout from "~/components/Layout";
import Task, { type TaskType } from "~/components/Task";
import { api } from "~/utils/api";

const TasksPage: NextPage = () => {
  const { user } = useUser();

  const tasks = api.tasks.getAll.useQuery({ userId: user?.id || "" });

  return (
    <Layout name="Tasks" footer={<div></div>}>
      <div className="flex h-full flex-col gap-4 overflow-y-auto py-4">
        {tasks.data?.map((task: TaskType) => {
          return (
            <Task
              {...task}
              key={task.id}
              onCompleteSuggestion={() => console.log("todo")}
            />
          );
        })}
      </div>
    </Layout>
  );
};

export default TasksPage;
