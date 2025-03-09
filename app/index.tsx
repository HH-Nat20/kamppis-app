import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { MatchProvider } from "./contexts/MatchContext";
import Toast from "react-native-toast-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "./contexts/UserContext";
import { MatchableProfilesProvider } from "./contexts/MatchableProfilesContext";

export default function App() {
  return (
    <UserProvider>
      <MatchableProfilesProvider>
        <MatchProvider>
          <SafeAreaProvider>
            <AppNavigator />
            <Toast />
          </SafeAreaProvider>
        </MatchProvider>
      </MatchableProfilesProvider>
    </UserProvider>
  );
}
