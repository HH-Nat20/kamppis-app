import React, { createContext, useState, useContext } from "react";
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

  const addMatch = (user: User) => {
    setMatches((prevMatches) => [...prevMatches, user]);
  };

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
