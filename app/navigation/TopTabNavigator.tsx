import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { User } from "../types/user";

const UpTab = createMaterialTopTabNavigator();

const TopTabNavigator: React.FC = () => {
  const [matches, setMatches] = useState<User[]>([]);

  return (
    <UpTab.Navigator>
      <UpTab.Screen name="Profile" component={ProfileScreen} />
      <UpTab.Screen name="Settings" component={SettingsScreen} />
    </UpTab.Navigator>
  );
};

export default TopTabNavigator;
