import type { Suggestion as TSuggestion, Task as TTask } from "@prisma/client";

import React from "react";
import { cn } from "~/utils/cn";
import { poppins } from "~/utils/fonts";
import Suggestion from "./Suggestion";

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
        <p
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full font-bold text-white",
            priority === 1 && "bg-red-500",
            priority === 2 && "bg-yellow-300",
            priority === 3 && "bg-green-500",
            priority > 3 && "bg-stone-200"
          )}
        >
          {priority}
        </p>
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
