import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { MatchProvider } from "./contexts/MatchContext";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <MatchProvider>
      <AppNavigator />
      <Toast />
    </MatchProvider>
  );
}
