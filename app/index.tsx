import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import SwipeScreen from "./screens/SwipeScreen";
import MatchesScreen from "./screens/MatchesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";
import { User } from "./types/user";

const Tab = createBottomTabNavigator();
const UpTab = createMaterialTopTabNavigator();



function NestStack() {

const [matches, setMatches] = useState<User[]>([]);

  return (
    <UpTab.Navigator>
      <UpTab.Screen name="Profile" component={ProfileScreen} />
      <UpTab.Screen name="Swipe" options={{swipeEnabled: false}}>
        {() => <SwipeScreen setMatches={setMatches} matches={matches} />}
      </UpTab.Screen>
      <Tab.Screen name="Matches">
        {() => <MatchesScreen matches={matches} />}
      </Tab.Screen>
      <UpTab.Screen name="Search" component={SearchScreen} />
       
    </UpTab.Navigator>
  );
};
  

  function UpperTab() {
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
      <Tab.Screen
        name="App"
        component={NestStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Home" component={HomeScreen} />
      
    </Tab.Navigator>
  );
}

export default function App() {

  return (

      <UpperTab />
    
  );
}
