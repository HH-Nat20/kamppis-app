import React from "react";
import { Stack } from "expo-router";

import { useColorScheme } from "react-native";
import colors from "tailwindcss/colors";

export default function SharedLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="swiper"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="matches"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}
