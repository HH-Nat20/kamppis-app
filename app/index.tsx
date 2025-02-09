import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SwipeScreen from "./screens/SwipeScreen";
import MatchesScreen from "./screens/MatchesScreen";
import { User } from "./types/user";

const Tab = createBottomTabNavigator();

const App = () => {
  const [matches, setMatches] = useState<User[]>([]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Swipe") {
            iconName = "people-circle-outline";
          } else if (route.name === "Matches") {
            iconName = "heart";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Swipe">
        {() => <SwipeScreen setMatches={setMatches} matches={matches} />}
      </Tab.Screen>
      <Tab.Screen name="Matches">
        {() => <MatchesScreen matches={matches} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default App;
