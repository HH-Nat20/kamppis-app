import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { MatchUser } from "../types/Match";
import { User, LoggedInUser } from "../types/User";

import dao from "../ajax/dao";

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

  useEffect(() => {
    const user: LoggedInUser = {
      id: 1,
      email: "alice.smith@example.com",
      status: "ONLINE",
    } as LoggedInUser;

    console.log("Initializing user:", user);

    dao
      .getUserProfile(user.id)
      .then((profile) => {
        console.log("Setting initial user profile:", profile);
        setUser({ ...user, ...profile });
      })
      .catch((error) => {
        console.error("Error fetching initial user profile", error);
      });
  }, []);

  const changeUser = (user: MatchUser) => {
    console.log("Fetching profile for user:", user);

    dao
      .getUserProfile(user.id)
      .then((profile) => {
        console.log("Profile data received:", profile);
        setUser({ ...user, ...profile });
      })
      .catch((error) => {
        console.error("Failed to fetch user profile", error);
      });
  };

  const refreshUser = () => {
    if (user) {
      console.log("Refreshing user:", user);
      changeUser(user);
    } else {
      console.warn("refreshUser() called, but no user is set.");
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
