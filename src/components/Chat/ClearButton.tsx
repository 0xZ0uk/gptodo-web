import React from "react";

interface ClearButtonProps {
  onClick: () => void;
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClick }) => {
  return (
    <button
      className="mx-auto w-fit rounded-md border px-4 py-2 text-xs text-slate-500"
      onClick={onClick}
    >
      Clear Chat
    </button>
  );
};

export default ClearButton;
