import React, { useLayoutEffect } from "react";
import { View, Text } from "react-native";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { useLocalSearchParams, useNavigation } from "expo-router";

import { RoomsDrawerProvider } from "@/contexts/RoomsDrawerContext";
import RoomsDrawerLayout from "@/components/custom/RoomsDrawerLayout";

import RoomScreen from ".";
import Photos from "./photos";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{"Room"}</Text>
      ),
    });
  }, [navigation, roomId]);

  return (
    <RoomsDrawerLayout>
      <Tab.Navigator
        initialRouteName="index"
        screenOptions={{
          lazy: true,
          tabBarStyle: { backgroundColor: "white" },
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: { width: "auto" },
          tabBarIndicatorStyle: { backgroundColor: "blue" },
        }}
      >
        <Tab.Screen name="index" component={() => <RoomScreen />} />
        <Tab.Screen name="photos" component={() => <Photos />} />
        <Tab.Screen name="Likes" component={() => <View />} />
      </Tab.Navigator>
    </RoomsDrawerLayout>
  );
}
