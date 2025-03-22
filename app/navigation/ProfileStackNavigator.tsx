import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileTabs from "./ProfileTabs";
import ImageUpload from "../screens/ImageUpload";
import { ProfileFormProvider } from "../contexts/ProfileFormContext";

import { colorSet } from "../ui/colors";

export type ProfileStackParamList = {
  ProfileTabs: undefined;
  Upload: { mode: string };
};

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator: React.FC = () => {
  return (
    <ProfileFormProvider>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colorSet.black },
          headerTitleStyle: { color: colorSet.white },
        }}
      >
        <Stack.Screen
          name="ProfileTabs"
          component={ProfileTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Upload"
          component={ImageUpload}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </ProfileFormProvider>
  );
};

export default ProfileStackNavigator;
