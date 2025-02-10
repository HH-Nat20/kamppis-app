import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import SwipeScreen from "../screens/SwipeScreen";
import MatchesScreen from "../screens/MatchesScreen";
import SearchScreen from "../screens/SearchScreen";
import { User } from "../types/user";

const UpTab = createMaterialTopTabNavigator();

const TopTabNavigator: React.FC = () => {
  const [matches, setMatches] = useState<User[]>([]);

  return (
    <UpTab.Navigator>
      <UpTab.Screen name="Profile" component={ProfileScreen} />
      <UpTab.Screen name="Swipe" options={{ swipeEnabled: false }}>
        {() => <SwipeScreen setMatches={setMatches} matches={matches} />}
      </UpTab.Screen>
      <UpTab.Screen name="Matches">
        {() => <MatchesScreen matches={matches} />}
      </UpTab.Screen>
      <UpTab.Screen name="Search" component={SearchScreen} />
    </UpTab.Navigator>
  );
};

export default TopTabNavigator;
