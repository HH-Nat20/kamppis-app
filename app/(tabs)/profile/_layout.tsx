import React from "react";

import { Stack, Redirect } from "expo-router";

import { ProfileDrawerProvider } from "@/contexts/ProfileDrawerContext";

import { useUser } from "@/contexts/UserContext";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  if (!user) {
    return <Redirect href="/login" />;
  }
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
