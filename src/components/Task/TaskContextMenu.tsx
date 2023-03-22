import React from "react";
import { RxDotsVertical, RxPencil1, RxTrash } from "react-icons/rx";
import { api } from "~/utils/api";
import { cn } from "~/utils/cn";
import { poppins } from "~/utils/fonts";
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
  onClick?: () => Promise<void>;
}

const TaskContextMenuItem: React.FC<TaskContextMenuItemProps> = ({
  className,
  children,
  onClick,
}) => {
  return (
    <ContextMenuItem
      className={cn(
        "flex gap-2 hover:bg-slate-100 active:bg-slate-100",
        className
      )}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={onClick}
    >
      {children}
    </ContextMenuItem>
  );
};

interface TaskContextMenuProps {
  id: string;
}

const TaskContextMenu: React.FC<TaskContextMenuProps> = ({ id }) => {
  const utils = api.useContext();

  const deleteTask = api.tasks.delete.useMutation({
    async onSuccess() {
      await utils.tasks.getAll.invalidate();
    },
  });

  const handleDeleteTask = async () => {
    await deleteTask.mutateAsync({
      id,
    });
  };
  return (
    <ContextMenu>
      <ContextMenuTrigger className="cursor-pointer rounded-full bg-stone-100">
        <RxDotsVertical className="m-1 text-stone-500" />
      </ContextMenuTrigger>
      <ContextMenuContent className={cn("font-poppins", poppins.variable)}>
        <ContextMenuLabel>AI</ContextMenuLabel>
        <TaskContextMenuItem>
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
