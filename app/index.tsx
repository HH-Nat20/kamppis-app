import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { MatchProvider } from "./contexts/MatchContext";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "./contexts/UserContext";
import { MatchableProfilesProvider } from "./contexts/MatchableProfilesContext";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/global.css";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <MatchableProfilesProvider>
          <MatchProvider>
            <SafeAreaProvider>
              <GluestackUIProvider mode={"system"}>
                <AppNavigator />
                <Toast />
              </GluestackUIProvider>
            </SafeAreaProvider>
          </MatchProvider>
        </MatchableProfilesProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
