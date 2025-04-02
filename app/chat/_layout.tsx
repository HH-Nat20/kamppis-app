import React from "react";

import { Stack } from "expo-router";

import { router } from "expo-router";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack>
      <Stack.Screen
        name="[matchId]"
        options={{
          headerShown: true,
          headerTitle: "Chat",
        }}
      />
    </Stack>
  );
};

export default ChatLayout;
