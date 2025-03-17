import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { MatchUser } from "../types/Match";
import { User } from "../types/User";

import dao from "../ajax/dao";

type LoggedInUser = MatchUser & User;

const UserContext = createContext<
  | {
      user: LoggedInUser | undefined;
      changeUser: (user: MatchUser) => void;
      refreshUser: () => void;
    }
  | undefined
>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<LoggedInUser | undefined>(undefined);

  const changeUser = (user: MatchUser) => {
    dao.getUserProfile(user.id).then((profile) => {
      setUser({ ...user, ...profile });
    });
  };

  useEffect(() => {
    const user: LoggedInUser = {
      id: 1,
      email: "alice.smith@example.com",
      status: "ONLINE",
    } as LoggedInUser;
    changeUser(user);
  }, []);

  const refreshUser = () => {
    if (user) {
      changeUser(user);
    }
  };

  return (
    <UserContext.Provider value={{ user, changeUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
