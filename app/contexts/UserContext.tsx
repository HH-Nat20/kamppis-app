import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { MatchUser } from "../types/Match";

type LoggedInUser = MatchUser;

const UserContext = createContext<
  | { user: LoggedInUser | undefined; setUser: (user: LoggedInUser) => void }
  | undefined
>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<LoggedInUser | undefined>(undefined);

  useEffect(() => {
    const user: LoggedInUser = {
      id: 1,
      email: "alice.smith@example.com",
      status: "ONLINE",
    };
    setUser(user);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
