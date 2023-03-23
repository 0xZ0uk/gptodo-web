import React from "react";
import { RxPlus } from "react-icons/rx";

interface AddTaskBtnProps {
  onClick: () => void;
}

const AddTaskBtn: React.FC<AddTaskBtnProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-3xl text-white transition-transform hover:scale-90 active:scale-90"
    >
      <RxPlus />
    </button>
  );
};

export default AddTaskBtn;
