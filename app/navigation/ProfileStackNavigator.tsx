import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ImageUpload from "../screens/ImageUpload";
import { ProfileFormProvider } from "../contexts/ProfileFormContext";
import { UserFormProvider } from "../contexts/UserFormContext";
import { PreferencesFormProvider } from "../contexts/PreferencesFormContext";
import ProfileScreen from "../screens/ProfileScreen";
import ProfilePersonalScreen from "../screens/ProfilePersonalScreen";
import ProfilePreferencesScreen from "../screens/ProfilePreferencesScreen";
import ProfilePhotosScreen from "../screens/ProfilePhotosScreen";
import PrivacySettingsScreen from "../screens/PrivacySettingsScreen";
import ProfileLifestyleScreen from "../screens/ProfileLifestyleScreen";

import { ProfileDrawerProvider } from "../contexts/ProfileDrawerContext";

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  "Personal Info": undefined;
  Lifestyle: undefined;
  "Match Preferences": undefined;
  "Privacy Settings": undefined;
  Photos: undefined;
  Upload: { mode: string };
};

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator: React.FC = () => {
  return (
    <ProfileDrawerProvider>
      <Stack.Navigator
        initialRouteName="ProfileScreen"
        screenOptions={{ animation: "fade_from_bottom" }}
      >
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: true, title: "Profile" }}
        />

        <Stack.Screen name="Personal Info" options={{ headerShown: true }}>
          {() => (
            <UserFormProvider>
              <ProfilePersonalScreen />
            </UserFormProvider>
          )}
        </Stack.Screen>

        <Stack.Screen name="Lifestyle" options={{ headerShown: true }}>
          {() => (
            <ProfileFormProvider>
              <ProfileLifestyleScreen />
            </ProfileFormProvider>
          )}
        </Stack.Screen>

        <Stack.Screen name="Match Preferences" options={{ headerShown: true }}>
          {() => (
            <PreferencesFormProvider>
              <ProfilePreferencesScreen />
            </PreferencesFormProvider>
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Privacy Settings"
          component={PrivacySettingsScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Photos"
          component={ProfilePhotosScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Upload"
          component={ImageUpload}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </ProfileDrawerProvider>
  );
};

export default ProfileStackNavigator;
