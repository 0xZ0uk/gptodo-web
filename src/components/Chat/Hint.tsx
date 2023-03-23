import React from "react";
import { cn } from "~/utils/cn";

interface HintProps {
  text: string;
  disabled?: boolean;
}

const Hint: React.FC<HintProps> = ({ text, disabled = false }) => {
  return (
    <div
      className={cn(
        "mx-auto w-3/4 text-center text-xs text-stone-400 underline",
        disabled && "hidden"
      )}
    >
      {text}
    </div>
  );
};

export default Hint;
