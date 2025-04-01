import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "../types/responses/User";
import { getUserQueryOptions } from "../queries/userQueries";

type UserContextType = {
  user: User | undefined;
  changeUser: (userId: number) => void;
  refreshUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<number>(1); // default userId

  const {
    data: user,
    refetch,
    isError,
    error,
  } = useQuery(getUserQueryOptions(userId));

  const changeUser = (newId: number) => {
    console.log("Changing user to", newId);
    setUserId(newId);
  };

  const refreshUser = () => {
    console.log("Refreshing user", userId);
    refetch();
  };

  const contextValue = {
    user,
    changeUser,
    refreshUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
