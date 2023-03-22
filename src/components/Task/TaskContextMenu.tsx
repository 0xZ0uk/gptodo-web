import React from "react";
import { RxDotsVertical, RxTrash } from "react-icons/rx";
import { api } from "~/utils/api";
import { cn } from "~/utils/cn";
import { poppins } from "~/utils/fonts";
import { onCompletion } from "~/utils/openai";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuLabel,
} from "../ui/ContextMenu";

interface TaskContextMenuItemProps {
  className?: string;
  children: React.ReactElement | React.ReactElement[];
  disabled?: boolean;
  onClick?: () => Promise<void>;
}

const TaskContextMenuItem: React.FC<TaskContextMenuItemProps> = ({
  className,
  children,
  disabled,
  onClick,
}) => {
  return (
    <ContextMenuItem
      className={cn(
        "flex gap-2 hover:bg-slate-100 active:bg-slate-100 disabled:text-stone-100",
        className
      )}
      disabled={disabled}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={onClick}
    >
      {children}
    </ContextMenuItem>
  );
};

interface TaskContextMenuProps {
  id: string;
  task: string;
  children: React.ReactElement;
  hasSuggestions?: boolean;
}

const TaskContextMenu: React.FC<TaskContextMenuProps> = ({
  id,
  task,
  children,
  hasSuggestions,
}) => {
  // API Calls
  const utils = api.useContext();

  const deleteTask = api.tasks.delete.useMutation({
    async onSuccess() {
      await utils.tasks.getAll.invalidate();
    },
  });

  const createSuggests = api.tasks.createSuggestions.useMutation({
    async onSuccess() {
      await utils.tasks.getAll.invalidate();
    },
  });

  const handleDeleteTask = async () => {
    await deleteTask.mutateAsync({
      id,
    });
  };

  // OpenAI Calls
  const handleBreakdown = async (task: string) => {
    const response = await onCompletion(`
      Provided a task you'll break it down into at least 3 and up to 5 smaller tasks:
      Task: Morning Routine
      
      1. Wake up
      2. Eat breakfast 
      3. Get dressed
      4. Brush teeth and wash face
      5. Gather belongings and leave for the day
      
      Task: Walk the dog for 30min
      
      1. Put on shoes
      2. Grab leash and collar
      3. Walk the dog for 15min
      4. Stop and give the dog water
      5. Walk the dog for an additional 15min
      
      Task: Clean my room
      
      1. Put away clothes
      2. Wipe down surfaces
      3. Vacuum the floor
      4. Dust
      5. Make the bed

      Task: ${task}
    `);

    const choices = response.data.choices[0].text
      .trim()
      .split("\n")
      .map((t) => t.trim().replace(/\d./, "").trim());

    await createSuggests.mutateAsync({ tasks: choices, taskId: id });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className={cn("font-poppins", poppins.variable)}>
        <ContextMenuLabel>AI</ContextMenuLabel>
        <TaskContextMenuItem
          onClick={() => handleBreakdown(task)}
          disabled={hasSuggestions}
        >
          <>Breakdown</>
        </TaskContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>Settings</ContextMenuLabel>
        <TaskContextMenuItem
          className="bg-slate-50 text-red-500"
          onClick={handleDeleteTask}
        >
          <>
            <RxTrash />
            Delete
          </>
        </TaskContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default TaskContextMenu;
