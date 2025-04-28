import React from "react";

import { Stack, Redirect } from "expo-router";

import { ProfileDrawerProvider } from "@/contexts/ProfileDrawerContext";

import { useColorScheme } from "react-native";
import colors from "tailwindcss/colors";

import { useUser } from "@/contexts/UserContext";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { user } = useUser();

  if (!user) {
    return <Redirect href="/login" />;
  }
  return (
    <ProfileDrawerProvider>
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
          headerTintColor: colors.teal[500],
          contentStyle: {
            backgroundColor: isDarkMode ? colors.black : colors.white,
          },
        }}
      >
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
