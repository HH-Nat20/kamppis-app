import React, { createContext, useContext, useEffect, useState } from "react";

import { ProfileCard } from "../types/ProfileCard";
import dao from "../ajax/dao";
import { useUser } from "./UserContext";

import { buildShuffledProfileCards } from "../helpers/profileCardBuilder";

interface MatchableProfilesContextProps {
  cards: ProfileCard[];
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
  const [cards, setCards] = useState<ProfileCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMatchableProfiles = async () => {
    setLoading(true);

    if (!user?.id) {
      console.warn("No logged-in user found");
      setLoading(false);
      return;
    }

    try {
      let profiles = await dao.getAllProfiles(); // dao.getPossibleMatches(user.id);

      if (profiles.length === 0) {
        setCards([]);
        setLoading(false);
        return;
      }

      // Filter out the current user
      profiles =
        profiles.filter &&
        profiles.filter((profile) => {
          const isCurrentUsersUserProfile =
            "userId" in profile && profile.userId === user.id;
          const isCurrentUsersRoomProfile =
            "userIds" in profile && profile.userIds?.includes(user.id);
          return !isCurrentUsersUserProfile && !isCurrentUsersRoomProfile;
        });

      if (!Array.isArray(profiles)) {
        console.warn("No users received from API");
        setLoading(false);
        return;
      }

      const profileCards: ProfileCard[] = buildShuffledProfileCards(profiles);
      setCards(profileCards);
      setLoading(false);
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
