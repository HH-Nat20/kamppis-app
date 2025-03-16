import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfilePersonalScreen from "../screens/ProfilePersonalScreen";
import ProfilePreferencesScreen from "../screens/ProfilePreferencesScreen";
import ProfilePhotosScreen from "../screens/ProfilePhotosScreen";
import { ProfileFormProvider } from "../contexts/ProfileFormContext";
import colors from "../ui/colors";

export type ProfileTabParamList = {
  "Personal Info": undefined;
  "Match Preferences": undefined;
  Photos: undefined;
};

const Tab = createMaterialTopTabNavigator<ProfileTabParamList>();

const ProfileTabs: React.FC = () => {
  return (
    <ProfileFormProvider>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: false,
          tabBarStyle: {
            backgroundColor: colors.background,
          },
          tabBarActiveTintColor: colors.active,
          tabBarInactiveTintColor: colors.inactive,
          tabBarIndicatorStyle: {
            backgroundColor: colors.border,
          },
        }}
      >
        <Tab.Screen name="Personal Info" component={ProfilePersonalScreen} />
        <Tab.Screen
          name="Match Preferences"
          component={ProfilePreferencesScreen}
        />
        <Tab.Screen name="Photos" component={ProfilePhotosScreen} />
      </Tab.Navigator>
    </ProfileFormProvider>
  );
};

export default ProfileTabs;
