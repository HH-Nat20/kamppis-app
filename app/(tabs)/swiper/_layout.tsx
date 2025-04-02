import React from "react";

import { Stack } from "expo-router";

import { ProfileDrawerProvider } from "@/contexts/ProfileDrawerContext";

import { router } from "expo-router";

const SwiperLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProfileDrawerProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="[profileId]"
          options={{
            headerShown: true,
            headerTitle: "", // This will be set in the ProfileDrawer
          }}
        />
      </Stack>
    </ProfileDrawerProvider>
  );
};

export default SwiperLayout;
