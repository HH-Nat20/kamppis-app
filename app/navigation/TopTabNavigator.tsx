import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfilePersonalScreen from "../screens/ProfilePersonalScreen";
import ProfilePreferencesScreen from "../screens/ProfilePreferencesScreen";

import colors from "../ui/colors";
import { ProfileFormContext } from "../contexts/ProfileFormContext";

export type ProfileTabParamList = {
  "Personal Info": undefined;
  "Match Preferences": undefined;
};

const UpTab = createMaterialTopTabNavigator();

const TopTabNavigator: React.FC = () => {
  return (
    <ProfileFormContext>
      <UpTab.Navigator
        initialRouteName="Personal Info"
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
        <UpTab.Screen name="Personal Info" component={ProfilePersonalScreen} />
        <UpTab.Screen
          name="Match Preferences"
          component={ProfilePreferencesScreen}
        />
      </UpTab.Navigator>
    </ProfileFormContext>
  );
};

export default TopTabNavigator;
