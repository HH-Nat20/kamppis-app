import React from "react";

import { ActivityIndicator } from "react-native";

import ProfilePhotos from "@/components/custom/ProfilePhotos";

import { useLocalSearchParams, useNavigation } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getRoomProfileQueryOptions } from "@/api/queries/roomQueries";

export default function Photos() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const navigation = useNavigation();

  const { data: profile, isLoading } = useQuery(
    getRoomProfileQueryOptions(Number(roomId))
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return <ProfilePhotos profile={profile!} />;
}
