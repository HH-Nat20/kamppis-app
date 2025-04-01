import React from "react";
import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { createURL } from "expo-linking";
import { ExpoRoot } from "expo-router/build/ExpoRoot";
import { Slot, Stack } from "expo-router";
import RootNavigator from "./navigation/RootNavigator";

import AppNavigator from "./navigation/AppNavigator";
import { MatchProvider } from "./contexts/MatchContext";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "./contexts/UserContext";
import { MatchableProfilesProvider } from "./contexts/MatchableProfilesContext";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/global.css";

const linking = {
  prefixes: [createURL("/")],
  config: {
    screens: {
      home: "",
      profiles: {
        path: "profiles/:user",
      },
    },
  },
};

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <UserProvider>
          <MatchableProfilesProvider>
            <MatchProvider>
              <SafeAreaProvider>
                <GluestackUIProvider mode={"system"}>
                  <Slot />
                  <Toast />
                </GluestackUIProvider>
              </SafeAreaProvider>
            </MatchProvider>
          </MatchableProfilesProvider>
        </UserProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
