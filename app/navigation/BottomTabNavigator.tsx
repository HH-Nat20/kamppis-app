import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SwipeScreen from "../screens/SwipeScreen";
import TopTabNavigator from "./TopTabNavigator";
import ChatStackNavigator from "./ChatStackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "rgba(47, 9, 69, 1)",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          paddingBottom: 5,
          height: 60,
          paddingTop: 5,
        },
        tabBarActiveTintColor: "rgb(195, 166, 214)",
        tabBarInactiveTintColor: "rgb(114, 56, 150)",
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
        component={SwipeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStackNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
