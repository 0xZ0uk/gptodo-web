import React from "react";
import { api } from "~/utils/api";
import { cn } from "~/utils/cn";
import { Checkbox } from "../ui/Checkbox";

interface TaskSubItemProps {
  id: string;
  text: string;
  complete: boolean;
}

const TaskSubItem: React.FC<TaskSubItemProps> = ({ id, text, complete }) => {
  // API Calls
  const utils = api.useContext();

  const toggle = api.tasks.completeSuggestion.useMutation({
    async onSuccess() {
      await utils.tasks.getAll.invalidate();
    },
  });

  const handleToggle = async () => {
    await toggle.mutateAsync({
      id,
      completed: !complete,
    });
  };

  return (
    <div
      className="flex cursor-pointer items-center space-x-2 rounded-md border p-2 text-stone-500"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={handleToggle}
    >
      <Checkbox id={id} checked={complete} />
      <label
        className={cn(
          "text-xs font-medium leading-none",
          complete && "line-through"
        )}
      >
        {text}
      </label>
    </div>
  );
};

export default TaskSubItem;
