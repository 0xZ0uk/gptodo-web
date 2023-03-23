import React from "react";
import { cn } from "~/utils/cn";
import { poppins } from "~/utils/fonts";

interface BubbleProps {
  text: string;
  type?: "assistant" | "user";
}

const Bubble: React.FC<BubbleProps> = ({ text, type = "assistant" }) => {
  return (
    <div
      className={cn(
        "rounded-t-md p-4 font-poppins text-sm text-white",
        poppins.variable,
        type === "assistant" && "rounded-r-md bg-slate-400",
        type === "user" && "rounded-l-md bg-blue-600"
      )}
    >
      {text}
    </div>
  );
};

export default Bubble;
