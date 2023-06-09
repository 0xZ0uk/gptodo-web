import React from "react";
import { cn } from "~/utils/cn";
import { poppins } from "~/utils/fonts";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { FaPaperPlane } from "react-icons/fa";

interface ICreateTask {
  value?: string;
  disabled?: boolean;
  onChangeInput: (value: string) => void;
  onSubmit: () => void;
}

const CreateTask: React.FC<ICreateTask> = ({
  value,
  disabled = false,
  onChangeInput,
  onSubmit,
}) => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const onSignInUp = () => {
    void router.push("/sign-in/");
    return;
  };

  return (
    <div id="input-area" className="h-16 border-t-2 py-2">
      {isSignedIn ? (
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            className={cn("font-poppins", poppins.variable)}
            placeholder="Write something todo..."
            value={value}
            disabled={disabled}
            onChange={(e) => onChangeInput(e.target.value)}
          />
          <Button
            type="submit"
            className="text-white"
            onClick={onSubmit}
            disabled={value === undefined || disabled}
          >
            <FaPaperPlane />
          </Button>
        </div>
      ) : (
        <div>
          <Button
            type="submit"
            className={cn("w-full font-poppins font-bold", poppins.variable)}
            onClick={onSignInUp}
          >
            Sign In/Sign Up
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
