import React, { useLayoutEffect } from "react";
import { View, Text } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { useLocalSearchParams, useNavigation } from "expo-router";

import RoomsDrawerLayout from "@/components/custom/RoomsDrawerLayout";

import { useQuery } from "@tanstack/react-query";
import { getRoomProfileQueryOptions } from "@/api/queries/roomQueries";

import { useColorScheme } from "react-native";
import colors from "tailwindcss/colors";

import RoomScreen from ".";
import Photos from "./photos";
import Likes from "./likes";
import Residents from "./residents";
import DeleteRoom from "./remove";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const navigation = useNavigation();

  const { data: room } = useQuery(getRoomProfileQueryOptions(Number(roomId)));

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: isDarkMode ? colors.white : colors.black,
          }}
        >
          {room?.name || "Room"}
        </Text>
      ),
      headerStyle: {
        backgroundColor: isDarkMode ? colors.gray[800] : colors.white,
      },
      headerTintColor: isDarkMode ? colors.white : colors.black,
    });
  }, [navigation, room]);

  return (
    <RoomsDrawerLayout>
      <Tab.Navigator
        initialRouteName="Room Details"
        screenOptions={{
          lazy: true,
          tabBarStyle: {
            backgroundColor: isDarkMode ? colors.gray[800] : colors.white,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            color: isDarkMode ? colors.white : colors.black,
          },
          tabBarItemStyle: { width: "auto" },
          tabBarIndicatorStyle: {
            backgroundColor: colors.teal[500],
          },
        }}
      >
        <Tab.Screen name="Room Details" component={RoomScreen} />
        <Tab.Screen name="Photos" component={Photos} />
        <Tab.Screen name="Likes" component={Likes} />
        <Tab.Screen name="Roommates" component={Residents} />
        <Tab.Screen name="Delete" component={DeleteRoom} />
      </Tab.Navigator>
    </RoomsDrawerLayout>
  );
}
