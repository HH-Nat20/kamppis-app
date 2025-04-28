import React from "react";

import { Stack, Redirect } from "expo-router";

import { RoomsDrawerProvider } from "@/contexts/RoomsDrawerContext";

import { useColorScheme } from "react-native";
import colors from "tailwindcss/colors";
import { StatusBar } from "expo-status-bar";

import { useUser } from "@/contexts/UserContext";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { user } = useUser();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <RoomsDrawerProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: isDarkMode ? colors.gray[800] : colors.white,
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            color: isDarkMode ? colors.white : colors.teal[900],
            fontSize: 18,
          },
          contentStyle: {
            backgroundColor: isDarkMode ? colors.black : colors.white,
          },
        }}
      >
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
      <StatusBar style="auto" />
    </RoomsDrawerProvider>
  );
};

export default ProfileLayout;
