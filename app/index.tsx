import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { MatchProvider } from "./contexts/MatchContext";

export default function App() {
  return (
    <MatchProvider>
      <AppNavigator />
    </MatchProvider>
  );
}
