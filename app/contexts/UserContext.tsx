import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { MatchUser } from "../types/Match";
import { User } from "../types/responses/User";

import dao from "../ajax/dao";

const UserContext = createContext<
  | {
      user: User | undefined;
      changeUser: (user: number) => void;
      refreshUser: () => void;
    }
  | undefined
>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    dao
      .getProfile(1) // TODO: Get profile by userID not profileId
      .then((profile) => {
        console.log("Setting initial user profile:", profile);
        setUser(profile); // TODO: Figure out correct datatype
      })
      .catch((error) => {
        console.error("Error fetching initial user profile", error);
      });
  }, []);

  const changeUser = (userId: number) => {
    console.log("Fetching profile for user:", user);

    dao
      .getProfile(userId)
      .then((profile) => {
        console.log("Profile data received:", profile);
        setUser(user);
      })
      .catch((error) => {
        console.error("Failed to fetch user profile", error);
      });
  };

  const refreshUser = () => {
    if (user) {
      console.log("Refreshing user:", user);
      changeUser(user.id);
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
