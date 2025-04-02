import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ProfileCard } from "../app/types/ProfileCard";
import { useUser } from "./UserContext";
import { buildShuffledProfileCards } from "../helpers/profileCardBuilder";
import { getMatchableProfilesQueryOptions } from "../api/queries/matchableProfilesQueries";

interface MatchableProfilesContextProps {
  cards: ProfileCard[];
  refreshMatchableProfiles: () => void;
  loading: boolean;
}

const MatchableProfilesContext = createContext<
  MatchableProfilesContextProps | undefined
>(undefined);

export const MatchableProfilesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    getMatchableProfilesQueryOptions(user?.id ?? 0)
  );

  const cards: ProfileCard[] = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    const filtered = data.filter((profile) => {
      const isCurrentUsersUserProfile =
        "userId" in profile && profile.userId === user?.id;
      const isCurrentUsersRoomProfile =
        "userIds" in profile && profile.userIds?.includes(user?.id!); // TODO: make sure ! doesn't crash the app (This should never be undefined)
      return !isCurrentUsersUserProfile && !isCurrentUsersRoomProfile;
    });

    return buildShuffledProfileCards(filtered);
  }, [data, user?.id]);

  const refreshMatchableProfiles = () => {
    if (user?.id) {
      queryClient.invalidateQueries({
        queryKey: ["matchableProfiles", user.id],
      });
    }
  };

  return (
    <MatchableProfilesContext.Provider
      value={{ cards, refreshMatchableProfiles, loading: isLoading }}
    >
      {children}
    </MatchableProfilesContext.Provider>
  );
};

export const useMatchableProfiles = () => {
  const context = useContext(MatchableProfilesContext);
  if (!context) {
    throw new Error(
      "useMatchableProfiles must be used within a MatchableProfilesProvider"
    );
  }
  return context;
};
