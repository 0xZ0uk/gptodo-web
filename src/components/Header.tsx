import React from "react";
import { useUser } from "@clerk/nextjs";
import { cn } from "~/utils/cn";
import { poppins } from "~/utils/fonts";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  return (
    <div
      id="header"
      className="flex h-fit w-full items-center justify-between border-b-2 py-2"
    >
      <div className="flex gap-2 uppercase">
        <Link
          href="/"
          className={cn(
            "font-poppins font-bold text-stone-400",
            poppins.variable,
            router.asPath === "/" && "text-stone-700"
          )}
        >
          Chat
        </Link>
        <Link
          href="/tasks"
          className={cn(
            "font-poppins font-bold text-stone-400",
            poppins.variable,
            router.asPath === "/tasks" && "text-stone-700"
          )}
        >
          Tasks
        </Link>
      </div>

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
