import React from "react";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ProfileScreen() {
  const { user } = useLocalSearchParams();

  return <Text style={{ color: "#FFF" }}>Viewing profile: {user}</Text>;
}
