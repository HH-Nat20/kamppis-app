import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import dao from "../ajax/dao";
import { useUser } from "./UserContext";

interface MatchableProfilesContextProps {
  cards: User[];
  refreshMatchableProfiles: () => Promise<void>;
  loading: boolean;
}

const MatchableProfilesContext = createContext<
  MatchableProfilesContextProps | undefined
>(undefined);

export const MatchableProfilesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useUser();
  const [cards, setCards] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMatchableProfiles = async () => {
    setLoading(true);

    if (!user?.id) {
      console.warn("No logged-in user found");
      setLoading(false);
      return;
    }

    try {
      let users: User[] = await dao.getPossibleMatches(user.id);

      if (users.length === 0) {
        setCards([]);
        setLoading(false);
        return;
      }

      // Filter out the current user
      users = users.filter((u) => u.id !== user.id);
      setLoading(false);

      if (!Array.isArray(users)) {
        console.warn("No users received from API");
        setLoading(false);
        return;
      }

      setCards(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }

    setLoading(false);
  };

  const refreshMatchableProfiles = async () => {
    await fetchMatchableProfiles();
  };

  useEffect(() => {
    fetchMatchableProfiles();
  }, [user]);

  return (
    <MatchableProfilesContext.Provider
      value={{ cards, refreshMatchableProfiles, loading }}
    >
      {children}
    </MatchableProfilesContext.Provider>
  );
};

export const useMatchableProfiles = () => {
  const context = useContext(MatchableProfilesContext);
  if (!context)
    throw new Error(
      "useMatchableProfiles must be used within a MatchableProfilesProvider"
    );
  return context;
};
