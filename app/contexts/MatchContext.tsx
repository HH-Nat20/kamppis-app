import React, { createContext, useState, useContext, useEffect } from "react";
import Toast from "react-native-toast-message";
import { User } from "../types/user";

interface MatchContextProps {
  matches: User[];
  addMatch: (user: User) => void;
}

const MatchContext = createContext<MatchContextProps | undefined>(undefined);

export const MatchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [matches, setMatches] = useState<User[]>([]);
  const [prevMatchesCount, setPrevMatchesCount] = useState(0);

  const addMatch = (user: User) => {
    setMatches((prevMatches) => [...prevMatches, user]);
  };

  // ** Match Listener: Show Toast when a new match is added **
  useEffect(() => {
    if (matches.length > prevMatchesCount) {
      const newMatch = matches[matches.length - 1]; // Get last added match
      Toast.show({
        type: "success",
        text1: "New Match!",
        text2: `${newMatch.firstName} matched with you 🎉`,
      });
    }
    setPrevMatchesCount(matches.length);
  }, [matches]); // Runs when matches update

  return (
    <MatchContext.Provider value={{ matches, addMatch }}>
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) throw new Error("useMatch must be used within a MatchProvider");
  return context;
};
