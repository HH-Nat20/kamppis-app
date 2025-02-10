import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import SwipeScreen from "../screens/SwipeScreen";
import MatchesScreen from "../screens/MatchesScreen";
import SearchScreen from "../screens/SearchScreen";
import { User } from "../types/user";

const UpTab = createMaterialTopTabNavigator();

const TopTabNavigator: React.FC = () => {
  const [matches, setMatches] = useState<User[]>([]);

  return (
    <UpTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "rgba(47, 9, 69, 1)",
        },
        tabBarActiveTintColor: "rgb(236, 218, 248)",
        tabBarInactiveTintColor: "rgb(191, 135, 225)",
        tabBarIndicatorStyle: {
          backgroundColor: "rgb(195, 166, 214)", // The line under active tab
        },
      }}
    >
      <UpTab.Screen name="Profile" component={ProfileScreen} />
      <UpTab.Screen
        name="Swipe"
        options={{ swipeEnabled: false }}
        component={SwipeScreen}
      />
      <UpTab.Screen name="Matches" component={MatchesScreen} />
      <UpTab.Screen name="Search" component={SearchScreen} />
    </UpTab.Navigator>
  );
};

export default TopTabNavigator;
