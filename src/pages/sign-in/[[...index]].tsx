import { SignIn } from "@clerk/nextjs";
import { cn } from "~/utils/cn";
import { poppins } from "~/utils/fonts";

const SignInPage = () => (
  <div
    className={cn(
      "flex h-screen items-center p-4 font-poppins",
      poppins.variable
    )}
  >
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </div>
);

export default SignInPage;
