import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "../types/responses/User";
import dao from "../ajax/dao";

const UserContext = createContext<
  | {
      user: User | undefined;
      changeUser: (userId: number) => void;
      refreshUser: () => void;
    }
  | undefined
>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const fetchAndSetUser = (userId: number) => {
    console.log("Fetching profile for user:", userId);

    dao
      .getUser(userId)
      .then((profile) => {
        console.log("Profile data received:", profile);
        setUser(profile);
      })
      .catch((error) => {
        console.error("Failed to fetch user profile", error);
      });
  };

  useEffect(() => {
    const defaultUserId = 1;
    fetchAndSetUser(defaultUserId);
  }, []);

  const changeUser = (userId: number) => {
    fetchAndSetUser(userId);
  };

  const refreshUser = () => {
    if (user) {
      console.log("Refreshing user:", user.id);
      fetchAndSetUser(user.id);
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
