import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import MatchesScreen from "../screens/MatchesScreen";
import SwipeScreen from "../screens/SwipeScreen";
import TopTabNavigator from "./TopTabNavigator";
import { User } from "../types/user";

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  const [matches, setMatches] = useState<User[]>([]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
      <Tab.Screen name="Swipe" options={{ headerShown: false }}>
        {() => <SwipeScreen setMatches={setMatches} matches={matches} />}
      </Tab.Screen>
      <Tab.Screen name="Chat" options={{ headerShown: false }}>
        {() => <MatchesScreen matches={matches} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
