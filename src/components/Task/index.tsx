import type { Suggestion as TSuggestion, Task as TTask } from "@prisma/client";

import React from "react";
import { cn } from "~/utils/cn";
import { poppins } from "~/utils/fonts";
import Suggestion from "./Suggestion";
import { RxDotsHorizontal } from "react-icons/rx";
import TaskContextMenu from "./TaskContextMenu";

export type TaskType = TTask & { suggestions: TSuggestion[] };

export interface TaskT extends TaskType {
  onCompleteSuggestion: (id: string, value: boolean) => void;
}

const Task: React.FC<TaskT> = ({
  task: name,
  priority,
  description,
  suggestions,
  onCompleteSuggestion,
}) => {
  const isComplete = false;
  // suggestions.filter((s) => s.completed).length === suggestions.length;

  return (
    <div
      className={cn(
        "h-fit rounded-md border py-2 px-4 font-poppins",
        poppins.variable
      )}
    >
      <div className="flex h-fit items-center justify-between">
        <h1
          className={cn(
            "text-lg font-bold",
            isComplete && "text-stone-500 line-through"
          )}
        >
          {name}
        </h1>
        <TaskContextMenu
          onDelete={() => console.log("delete")}
          onEdit={() => console.log("edit")}
        />
      </div>
      <p className="mb-2 text-sm text-stone-600">{description}</p>
      <div className="flex flex-col gap-2">
        {suggestions?.map((s) => (
          <Suggestion key={s.id} {...s} onComplete={onCompleteSuggestion} />
        ))}
      </div>
    </div>
  );
};

export default Task;
