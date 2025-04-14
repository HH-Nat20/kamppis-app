import React, { useLayoutEffect } from "react";

import { View, Text } from "react-native";

import { router, useLocalSearchParams, useNavigation } from "expo-router";

import { useQuery } from "@tanstack/react-query";
import { getRoomProfileQueryOptions } from "@/api/queries/roomQueries";

const RoomProfile = () => {
  const navigation = useNavigation();

  const { roomId } = useLocalSearchParams<{ roomId: string }>();

  const { data: room, isLoading } = useQuery(
    getRoomProfileQueryOptions(Number(roomId))
  );

  if (isLoading) return <Text>Loading...</Text>;

  if (!room) return <Text>Room not found</Text>;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{room.name}</Text>
      ),
      headerRight: () => <></>,
    });
  }, [navigation]);

  return (
    <View>
      <Text>Room Profile</Text>
      <Text>{room.name}</Text>
      <Text>{room.bio}</Text>
    </View>
  );
};

export default RoomProfile;
