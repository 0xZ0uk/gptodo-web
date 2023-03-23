import Head from "next/head";
import React from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import Drawer from "./Drawer";
import Header from "./Header";
import AddTaskDrawer from "./Task/AddTaskDrawer";

type DrawerType = "add_task";

interface LayoutState {
  drawerToggled: boolean;
  drawerType?: DrawerType;
  toggleDrawer: (type: DrawerType, value: boolean) => void;
}

export const useLayoutStore = create<LayoutState>()(
  devtools(
    (set) => ({
      drawerToggled: false,
      drawerType: undefined,
      toggleDrawer: (type: DrawerType, value: boolean) =>
        set((state: LayoutState) => {
          return {
            ...state,
            drawerToggled: value,
            drawerType: type,
          };
        }),
    }),
    {
      name: "layout-state",
    }
  )
);

interface LayoutProps {
  name: string;
  children: React.ReactElement | React.ReactElement[];
  footer: React.ReactElement;
}

const Layout: React.FC<LayoutProps> = ({ name, children, footer }) => {
  const { drawerType, drawerToggled } = useLayoutStore();

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
        className="flex h-screen max-h-screen min-h-screen w-screen justify-center overflow-hidden bg-slate-900 "
      >
        <div className="m-4 flex w-full flex-col rounded-md bg-slate-50 px-4 py-2 text-slate-900">
          <Header />
          {children}
          {footer}
        </div>
        <Drawer toggled={drawerToggled}>
          {drawerType === "add_task" && <AddTaskDrawer />}
          <div></div>
        </Drawer>
      </main>
    </>
  );
};

export default Layout;
