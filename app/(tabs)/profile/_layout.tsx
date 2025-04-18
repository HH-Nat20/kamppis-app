import React from "react";

import { Stack } from "expo-router";

import { ProfileDrawerProvider } from "@/contexts/ProfileDrawerContext";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProfileDrawerProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerTitle: "Profile",
            headerLeft: () => <></>,
          }}
        />
      </Stack>
    </ProfileDrawerProvider>
  );
};

export default ProfileLayout;
