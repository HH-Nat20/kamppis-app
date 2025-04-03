import React from "react";
import { Stack } from "expo-router";

export default function SharedLayout() {
  return (
    <Stack>
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
    </Stack>
  );
}
