import React, { createContext, useState, useContext, useEffect } from "react";
import Toast from "react-native-toast-message";
import { User } from "../types/User";

import dao from "../ajax/dao";
import { useUser } from "./UserContext";

interface MatchContextProps {
  matches: User[];
}

const MatchContext = createContext<MatchContextProps | undefined>(undefined);

export const MatchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [matches, setMatches] = useState<User[]>([]);
  const [prevMatchesCount, setPrevMatchesCount] = useState(0);
  const { user } = useUser();

  // Fetch matches from the backend every 50 seconds
  useEffect(() => {
    const fetchMatches = async () => {
      if (!user?.id) return;
      try {
        const matches = await dao.getMatchedProfiles(user.id);
        setMatches(matches);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches(); // Fetch on mount
    const interval = setInterval(fetchMatches, 50000); // Increased to 50 sec for now

    return () => clearInterval(interval);
  }, [user]);

  // Match Listener: Show Toast when a new match is added
  useEffect(() => {
    if (matches.length > prevMatchesCount) {
      const newMatch = matches[matches.length - 1];
      Toast.show({
        type: "success",
        text1: "New Match!",
        text2: `${newMatch.firstName} matched with you 🎉`,
      });
    }
    setPrevMatchesCount(matches.length);
  }, [matches]);

  return (
    <MatchContext.Provider value={{ matches }}>
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) throw new Error("useMatch must be used within a MatchProvider");
  return context;
};
