import React, { createContext, useContext, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { MatchWithUser } from "@/types/Match";
import { useUser } from "./UserContext";
import { getUserMatchesQueryOptions } from "../api/queries/matchQueries";

interface MatchContextProps {
  matches: MatchWithUser[];
  refreshMatches: () => void;
}

const MatchContext = createContext<MatchContextProps | undefined>(undefined);

export const MatchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const userId = user?.id;
  const queryClient = useQueryClient();

  const { data: matches = [], isSuccess } = useQuery(
    getUserMatchesQueryOptions(userId ?? 0)
  );

  const prevMatchCount = useRef(0);

  // Show toast when new match is added
  useEffect(() => {
    if (!matches || !isSuccess || matches.length <= prevMatchCount.current)
      return;

    const newMatch = matches[matches.length - 1];
    Toast.show({
      type: "success",
      text1: "New Match!",
      text2: `${newMatch.users[0].firstName} matched with you 🎉`, // TODO: This shows just the first user if the match is with many users
    });

    prevMatchCount.current = matches.length;
  }, [matches, isSuccess]);

  const refreshMatches = () => {
    if (userId) {
      queryClient.invalidateQueries({ queryKey: ["matches", userId] });
    }
  };

  return (
    <MatchContext.Provider value={{ matches, refreshMatches }}>
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error("useMatch must be used within a MatchProvider");
  }
  return context;
};
