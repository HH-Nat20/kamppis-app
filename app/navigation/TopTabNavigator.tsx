import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfilePersonalScreen from "../screens/ProfilePersonalScreen";
import ProfilePreferencesScreen from "../screens/ProfilePreferencesScreen";
import ProfilePhotosScreen from "../screens/ProfilePhotosScreen";

import colors from "../ui/colors";
import { ProfileFormProvider } from "../contexts/ProfileFormContext";

export type ProfileTabParamList = {
  "Personal Info": undefined;
  "Match Preferences": undefined;
};

const UpTab = createMaterialTopTabNavigator();

const TopTabNavigator: React.FC = () => {
  return (
    <ProfileFormProvider>
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
        <UpTab.Screen name="Personal Info" component={ProfilePersonalScreen} />
        <UpTab.Screen
          name="Match Preferences"
          component={ProfilePreferencesScreen}
        />
        <UpTab.Screen name="Photos" component={ProfilePhotosScreen} />
      </UpTab.Navigator>
    </ProfileFormProvider>
  );
};

export default TopTabNavigator;
