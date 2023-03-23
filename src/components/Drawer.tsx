import React from "react";
import { cn } from "~/utils/cn";

interface DrawerProps {
  toggled: boolean;
  children: React.ReactElement | React.ReactElement[];
}

const Drawer: React.FC<DrawerProps> = ({ toggled = false, children }) => {
  return (
    <div
      className={cn(
        "absolute h-screen w-full bg-slate-900/30 backdrop-blur-sm transition-opacity",
        toggled ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <div
        className={cn(
          "absolute bottom-0 w-full border-t-4 bg-slate-50 transition-all",
          toggled ? "h-fit" : "h-0"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Drawer;
