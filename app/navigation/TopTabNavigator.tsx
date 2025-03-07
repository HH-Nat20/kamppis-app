import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileInfoScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

import colors from "../ui/colors";
import { ProfileFormContext } from "../contexts/ProfileFormContext";

const UpTab = createMaterialTopTabNavigator();

const TopTabNavigator: React.FC = () => {
  return (
    <ProfileFormContext>
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
        <UpTab.Screen name="Personal Info" component={ProfileInfoScreen} />
        <UpTab.Screen name="Match Preferences" component={SettingsScreen} />
      </UpTab.Navigator>
    </ProfileFormContext>
  );
};

export default TopTabNavigator;
