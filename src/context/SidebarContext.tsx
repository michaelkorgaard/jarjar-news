import { createContext, useContext } from "react";

export type SidebarContent = {
  sidebarState: boolean;
  setSidebarState: (value: boolean) => void;
};

const SidebarContext = createContext<SidebarContent>({
  sidebarState: false,
  setSidebarState: () => {},
});

export const SidebarContextProvider = SidebarContext.Provider;
export const useSidebarContext = () => useContext(SidebarContext);
