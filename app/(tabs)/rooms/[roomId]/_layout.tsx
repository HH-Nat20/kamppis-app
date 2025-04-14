import React, { useLayoutEffect } from "react";
import { View, Text } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { useLocalSearchParams, useNavigation } from "expo-router";

import RoomsDrawerLayout from "@/components/custom/RoomsDrawerLayout";

import { useQuery } from "@tanstack/react-query";
import { getRoomProfileQueryOptions } from "@/api/queries/roomQueries";

import RoomScreen from ".";
import Photos from "./photos";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const navigation = useNavigation();

  const { data: room } = useQuery(getRoomProfileQueryOptions(Number(roomId)));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {room?.name || "Room"}
        </Text>
      ),
    });
  }, [navigation, room]);

  return (
    <RoomsDrawerLayout>
      <Tab.Navigator
        initialRouteName="Room Details"
        screenOptions={{
          lazy: true,
          tabBarStyle: { backgroundColor: "white" },
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: { width: "auto" },
          tabBarIndicatorStyle: { backgroundColor: "blue" },
        }}
      >
        <Tab.Screen name="Room Details" component={() => <RoomScreen />} />
        <Tab.Screen name="Photos" component={() => <Photos />} />
        <Tab.Screen name="Likes" component={() => <View />} />
      </Tab.Navigator>
    </RoomsDrawerLayout>
  );
}
