import React from "react";
import { useUser } from "@clerk/nextjs";
import { cn } from "~/utils/cn";
import { poppins } from "~/utils/fonts";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/DropdownMenu";
import { RxPerson, RxIdCard, RxGear, RxExit } from "react-icons/rx";

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
            "font-poppins font-bold text-slate-400",
            poppins.variable,
            router.asPath === "/" && "text-slate-700"
          )}
        >
          Chat
        </Link>
        <Link
          href="/tasks"
          className={cn(
            "font-poppins font-bold text-slate-400",
            poppins.variable,
            router.asPath === "/tasks" && "text-slate-700"
          )}
        >
          Tasks
        </Link>
      </div>

      {isSignedIn && (
        <DropdownMenu>
          <DropdownMenuTrigger className={cn("font-poppins", poppins.variable)}>
            <Avatar>
              <AvatarImage />
              <AvatarFallback>PS</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={cn("font-poppins", poppins.variable)}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2">
              <RxPerson /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <RxGear /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <RxIdCard /> Billing
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 text-red-500">
              <RxExit /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default Header;
