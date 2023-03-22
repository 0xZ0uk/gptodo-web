import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { cn } from "~/utils/cn";
import { poppins } from "~/utils/fonts";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={cn("font-poppins", poppins.variable)}>
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
