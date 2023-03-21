import type { Suggestion as TSuggestion, Task as TTask } from "@prisma/client";
import React from "react";
import { cn } from "~/utils/cn";
import { poppins } from "~/utils/fonts";
import { Checkbox } from "./ui/Checkbox";

type TaskType = TTask & { suggestions: TSuggestion[] };

interface SugestionsProps extends TSuggestion {
  onComplete: (id: string, value: boolean) => void;
}

const Suggestion: React.FC<SugestionsProps> = ({
  id,
  completed,
  name,
  onComplete,
}) => {
  return (
    <div className="flex items-start space-x-2 text-stone-500">
      <Checkbox
        id={id}
        checked={completed}
        onClick={() => onComplete(id, !completed)}
      />
      <label className="text-sm font-medium leading-none">{name}</label>
    </div>
  );
};

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
  const isComplete =
    suggestions.filter((s) => s.completed).length === suggestions.length;

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

interface TasksProps {
  tasks?: TaskType[];
  onCompleteSuggestion: (id: string, value: boolean) => void;
}

const Tasks: React.FC<TasksProps> = ({ tasks, onCompleteSuggestion }) => {
  return (
    <div
      id="task-area"
      className="flex h-full flex-col gap-4 overflow-y-auto py-4"
    >
      {tasks?.map((task: TaskType) => {
        return (
          <Task
            {...task}
            key={task.id}
            onCompleteSuggestion={onCompleteSuggestion}
          />
        );
      })}
    </div>
  );
};

export default Tasks;
