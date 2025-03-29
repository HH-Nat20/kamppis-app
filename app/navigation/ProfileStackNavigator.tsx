import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ImageUpload from "../screens/ImageUpload";
import { ProfileFormProvider } from "../contexts/ProfileFormContext";
import { PersonalInfoFormProvider } from "../contexts/PersonalInfoFormContext";
import { PreferencesFormProvider } from "../contexts/PreferencesFormContext";
import ProfileScreen from "../screens/ProfileScreen";
import ProfilePersonalScreen from "../screens/ProfilePersonalScreen";
import ProfilePreferencesScreen from "../screens/ProfilePreferencesScreen";
import ProfilePhotosScreen from "../screens/ProfilePhotosScreen";

import { ProfileDrawerProvider } from "../contexts/ProfileDrawerContext";

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  "Personal Info": undefined;
  "Match Preferences": undefined;
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
            <PersonalInfoFormProvider>
              <ProfilePersonalScreen />
            </PersonalInfoFormProvider>
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
