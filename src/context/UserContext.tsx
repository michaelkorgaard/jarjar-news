import { createContext, useContext } from "react";
import { UserType } from "../types/UserType";

type UserContextType = {
  currentUser: UserType | null;
  allUsers: UserType[] | null;
  setCurrentUser: (user: UserType | null) => void;
  setAllUsers: (user: UserType[] | null) => void;
};

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  allUsers: null,
  setCurrentUser: () => {},
  setAllUsers: () => {},
});

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
};
