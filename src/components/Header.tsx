import { format } from "date-fns";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { cn } from "~/utils/cn";
import { poppins } from "~/utils/fonts";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";

const Header = () => {
  const { isSignedIn } = useUser();

  return (
    <div
      id="header"
      className="flex h-fit w-full items-end justify-between border-b-2 py-2"
    >
      <p
        className={cn(
          "font-poppins font-bold text-stone-400",
          poppins.variable
        )}
      >
        {format(new Date(), "eeee").substring(0, 3).toUpperCase()}
      </p>
      {isSignedIn && (
        <Avatar className={cn("font-poppins", poppins.variable)}>
          <AvatarImage />
          <AvatarFallback>PS</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default Header;
