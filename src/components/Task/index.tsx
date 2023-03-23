import type { Suggestion as TSuggestion, Task as TTask } from "@prisma/client";
import React from "react";
import { cn } from "~/utils/cn";
import { poppins } from "~/utils/fonts";
import Suggestion from "./Suggestion";
import TaskContextMenu from "./TaskContextMenu";
import TaskSubItem from "./TaskSubItem";

export type TaskType = TTask & { suggestions: TSuggestion[] };

export interface TaskT extends TaskType {
  onCompleteSuggestion: (id: string, value: boolean) => void;
}

const Task: React.FC<TaskT> = ({
  id,
  task: name,
  priority,
  description,
  suggestions,
  onCompleteSuggestion,
}) => {
  const isComplete = false;
  // suggestions.filter((s) => s.completed).length === suggestions.length;

  return (
    <TaskContextMenu
      id={id}
      task={description}
      hasSuggestions={suggestions.length > 0}
    >
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
              isComplete && "text-slate-500 line-through"
            )}
          >
            {name}
          </h1>
        </div>
        <p className="mb-2 text-sm text-slate-600">{description}</p>
        <div className="flex flex-col gap-2">
          {suggestions?.map((s) => (
            <TaskSubItem
              key={s.id}
              text={s.name}
              complete={s.completed}
              id={s.id}
            />
          ))}
        </div>
      </div>
    </TaskContextMenu>
  );
};

export default Task;
