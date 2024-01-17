import { createContext, useContext } from "react";

export type SidebarContent = {
  sidebarState: boolean;
  setSidebarState: (value: boolean) => void;
};

export const SidebarContext = createContext<SidebarContent>({
  sidebarState: false,
  setSidebarState: () => {},
});

export const useGlobalContext = () => useContext(SidebarContext);
