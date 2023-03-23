import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Layout, { useLayoutStore } from "~/components/Layout";
import Task, { type TaskType } from "~/components/Task";
import AddTaskBtn from "~/components/Task/AddTaskBtn";
import { api } from "~/utils/api";

const TasksPage: NextPage = () => {
  const { user } = useUser();
  const { toggleDrawer } = useLayoutStore();

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
      <AddTaskBtn onClick={() => toggleDrawer("add_task", true)} />
    </Layout>
  );
};

export default TasksPage;
