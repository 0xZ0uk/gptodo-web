import Head from "next/head";
import React from "react";
import Header from "./Header";

interface LayoutProps {
  name: string;
  children: React.ReactElement | React.ReactElement[];
  footer: React.ReactElement;
}

const Layout: React.FC<LayoutProps> = ({ name, children, footer }) => {
  return (
    <>
      <Head>
        <title>BitTask - {name}</title>
        <meta name="description" content="Achievable tasks." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        id={name}
        className="flex h-screen max-h-screen min-h-screen w-screen justify-center overflow-hidden bg-black"
      >
        <div className="m-4 flex w-full flex-col rounded-md bg-white px-4 py-2">
          <Header />
          {children}
          {footer}
        </div>
      </main>
    </>
  );
};

export default Layout;
