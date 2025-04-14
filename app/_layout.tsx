import React, { useEffect } from "react";

import { Slot, Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { MatchProvider } from "../contexts/MatchContext";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "../contexts/UserContext";
import { MatchableProfilesProvider } from "../contexts/MatchableProfilesContext";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <UserProvider>
          <MatchableProfilesProvider>
            <MatchProvider>
              <SafeAreaProvider>
                <GluestackUIProvider mode={"system"}>
                  <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="(auth)" options={{}} />
                    <Stack.Screen
                      name="flatModal"
                      options={{
                        presentation: "transparentModal",
                        animation: "slide_from_bottom",
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="roomModal"
                      options={{
                        presentation: "transparentModal",
                        animation: "slide_from_left",
                        headerShown: false,
                      }}
                    />
                  </Stack>
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
