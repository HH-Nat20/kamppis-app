import React, { createContext, useState, useContext, useEffect } from "react";
import Toast from "react-native-toast-message";
import { User } from "../types/responses/User";
import { MatchWithUser } from "../types/Match";
import { Match } from "../types/Match";

import dao from "../ajax/dao";
import { useUser } from "./UserContext";

interface MatchContextProps {
  matches: MatchWithUser[];
  refreshMatches: () => void;
}

const MatchContext = createContext<MatchContextProps | undefined>(undefined);

export const MatchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [matches, setMatches] = useState<MatchWithUser[]>([]);
  const [prevMatchesCount, setPrevMatchesCount] = useState(0);
  const { user } = useUser();

  // Fetch matches from the backend every 50 seconds

  const fetchMatches = async () => {
    if (!user?.id) return;
    try {
      const matchesResponse = await dao.getMatches(user.id);

      const userMatches: MatchWithUser[] = await Promise.all(
        matchesResponse.map(async (match: Match) => {
          const otherUserId = match.userIds.find((id) => id !== user.id)!;
          const userProfile = await dao.getProfile(otherUserId);
          return {
            user: userProfile,
            matchId: match.id,
          };
        })
      );

      setMatches(userMatches);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching matches for user:", user);
    fetchMatches(); // Fetch on mount
  }, [user]);

  // Match Listener: Show Toast when a new match is added
  useEffect(() => {
    if (matches.length > prevMatchesCount) {
      const newMatch = matches[matches.length - 1];
      Toast.show({
        type: "success",
        text1: "New Match!",
        text2: `${newMatch.user.firstName} matched with you 🎉`,
      });
    }
    setPrevMatchesCount(matches.length);
  }, [matches]);

  return (
    <MatchContext.Provider value={{ matches, refreshMatches: fetchMatches }}>
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) throw new Error("useMatch must be used within a MatchProvider");
  return context;
};
