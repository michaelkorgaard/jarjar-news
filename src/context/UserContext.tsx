import { createContext, useContext } from "react";
import { UserType } from "../types/UserType";

export type User = {
  user: UserType | null;
  setUser: (user: UserType) => void;
};

export const UserContext = createContext<User | null>(null);

export const useUserContext = () => {
  return useContext(UserContext);
};
