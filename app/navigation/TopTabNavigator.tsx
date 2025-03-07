import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

import colors from "../ui/colors";

const UpTab = createMaterialTopTabNavigator();

const TopTabNavigator: React.FC = () => {
  return (
    <UpTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background,
        },
        tabBarActiveTintColor: colors.active,
        tabBarInactiveTintColor: colors.inactive,
        tabBarIndicatorStyle: {
          backgroundColor: colors.border, // The line under active tab
        },
      }}
    >
      <UpTab.Screen name="Profile" component={ProfileScreen} />
      <UpTab.Screen name="Settings" component={SettingsScreen} />
    </UpTab.Navigator>
  );
};

export default TopTabNavigator;
