import React from "react";
import { RxDotsHorizontal } from "react-icons/rx";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/ContextMenu";

interface TaskContextMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const TaskContextMenu: React.FC<TaskContextMenuProps> = () => {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="cursor-pointer rounded-full bg-stone-100">
        <RxDotsHorizontal className="m-1 text-stone-500" />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default TaskContextMenu;
