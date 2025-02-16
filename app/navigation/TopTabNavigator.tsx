import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

const UpTab = createMaterialTopTabNavigator();

const TopTabNavigator: React.FC = () => {
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
      <UpTab.Screen name="Settings" component={SettingsScreen} />
    </UpTab.Navigator>
  );
};

export default TopTabNavigator;
