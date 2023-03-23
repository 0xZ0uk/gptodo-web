/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Textarea } from "../ui/Textarea";
import { RxCrossCircled } from "react-icons/rx";
import { useLayoutStore } from "../Layout";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

interface AddTaskDrawerState {
  title: string;
  description: string;
  onChange: (field: string) => (value: string) => void;
}

export const useAddTaskDrawerStore = create<AddTaskDrawerState>()(
  devtools(
    (set) => ({
      title: "",
      description: "",
      onChange: (field: string) => (value: string) =>
        set((state: AddTaskDrawerState) => {
          return { ...state, [field]: value };
        }),
    }),
    {
      name: "add-task-drawer-state",
    }
  )
);

const AddTaskDrawer = () => {
  const { title, description, onChange } = useAddTaskDrawerStore();
  const { toggleDrawer } = useLayoutStore();

  // API Context Utils
  const utils = api.useContext();
  const { user } = useUser();
  const addTask = api.tasks.create.useMutation({
    async onSuccess() {
      await utils.tasks.getAll.invalidate();
    },
  });

  const handleAddTask = async () => {
    await addTask.mutateAsync({
      task: title,
      description: description,
      userId: user.id,
    });

    toggleDrawer(undefined, false);
  };

  return (
    <div className="flex flex-col gap-4 px-4 pt-8 pb-16">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Add Task</h3>
        <RxCrossCircled
          className="text-xl"
          onClick={() => toggleDrawer(undefined, false)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="add-title">Title</Label>
        <Input
          id="add-title"
          value={title}
          name="title"
          onChange={(e) => onChange("title")(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="add-description">Description*</Label>
        <Textarea
          id="add-description"
          value={description}
          onChange={(e) => onChange("description")(e.target.value)}
        />
        <p className="text-xs text-slate-500">
          Bit uses the description to breakdown your task
        </p>
      </div>
      <Button onClick={handleAddTask}>Add Task</Button>
    </div>
  );
};

export default AddTaskDrawer;
