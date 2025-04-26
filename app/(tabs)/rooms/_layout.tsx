import React from "react";

import { Stack, Redirect } from "expo-router";

import { RoomsDrawerProvider } from "@/contexts/RoomsDrawerContext";

import { useUser } from "@/contexts/UserContext";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  if (!user) {
    return <Redirect href="/login" />;
  }

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
            headerShown: true,
            headerTitle: "Room Profile",
          }}
        />
      </Stack>
    </RoomsDrawerProvider>
  );
};

export default ProfileLayout;
