import React from "react";

import { SignUp } from "@clerk/nextjs";
import { cn } from "~/utils/cn";
import { poppins } from "~/utils/fonts";

const SignUpPage = () => (
  <div
    className={cn(
      "flex h-screen items-center p-4 font-poppins",
      poppins.variable
    )}
  >
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
  </div>
);

export default SignUpPage;
