import React from "react";

const SkeletonBubble = ({}) => {
  return (
    <div
      className={
        "flex w-3/4 animate-pulse flex-col gap-2 rounded-t-md rounded-r-md bg-slate-400 p-4"
      }
    >
      <div className="h-3 w-full rounded-md bg-slate-300"></div>
      <div className="h-3 w-3/4 rounded-md bg-slate-300"></div>
    </div>
  );
};

export default SkeletonBubble;
