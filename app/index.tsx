import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import SwipeScreen from "./screens/SwipeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SearchScreen from "./screens/SearchScreen";

const Tab = createBottomTabNavigator();
const UpTab = createMaterialTopTabNavigator();

function NestStack() {
  return (
    <UpTab.Navigator>
      <UpTab.Screen name="Profile" component={ProfileScreen} />
      <UpTab.Screen name="Kämppis" component={SwipeScreen} options={{swipeEnabled: false}}/>
      <UpTab.Screen name="Search" component={SearchScreen} />
      
    </UpTab.Navigator>
  );
};

function UpperTab() {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      // Navigator can be customized using screenOptions
      tabBarIcon: ({ focused, color, size }) => {
        // Function tabBarIcon is given the focused state,
        // color and size params
        let iconName;

        if (route.name === "Home") {
          iconName = "home";
        } else if (route.name === "Swipe") {
          iconName = "people-circle-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />; //it returns an icon component
      },
    })}>
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
