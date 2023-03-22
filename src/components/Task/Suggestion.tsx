import React from "react";
import type { Suggestion as TSuggestion } from "@prisma/client";
import { Checkbox } from "@radix-ui/react-checkbox";

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

export default Suggestion;
