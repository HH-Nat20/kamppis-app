import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import MatchesScreen from "../screens/MatchesScreen";
import SwipeScreen from "../screens/SwipeScreen";
import TopTabNavigator from "./TopTabNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "rgba(47, 9, 69, 1)",
          borderTopWidth: 0, // Removes the top border
          elevation: 0, // Removes shadow on Android
          shadowOpacity: 0, // Removes shadow on iOS
        },
        tabBarActiveTintColor: "rgb(195, 166, 214)", // Active tab color
        tabBarInactiveTintColor: "rgb(114, 56, 150)", // Inactive tab color
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Profile") iconName = "person-outline";
          else if (route.name === "Swipe") iconName = "heart-half-outline";
          else if (route.name === "Chat") iconName = "chatbubbles-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={TopTabNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Swipe"
        options={{ headerShown: false }}
        component={SwipeScreen}
      />
      <Tab.Screen
        name="Chat"
        options={{ headerShown: false }}
        component={MatchesScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
