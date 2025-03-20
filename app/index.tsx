import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { MatchProvider } from "./contexts/MatchContext";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "./contexts/UserContext";
import { MatchableProfilesProvider } from "./contexts/MatchableProfilesContext";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

export default function App() {
  return (
    <UserProvider>
      <MatchableProfilesProvider>
        <MatchProvider>
          <SafeAreaProvider>
            <GluestackUIProvider>
              <AppNavigator />
              <Toast />
            </GluestackUIProvider>
          </SafeAreaProvider>
        </MatchProvider>
      </MatchableProfilesProvider>
    </UserProvider>
  );
}
