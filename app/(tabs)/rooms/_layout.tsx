import React from "react";

import { Stack } from "expo-router";

import { RoomsDrawerProvider } from "@/contexts/RoomsDrawerContext";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RoomsDrawerProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerTitle: "My Rooms",
          }}
        />
        <Stack.Screen
          name="[roomId]"
          options={{
            headerShown: false,
            headerTitle: "Room Profile",
          }}
        />
      </Stack>
    </RoomsDrawerProvider>
  );
};

export default ProfileLayout;
