import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SwipeScreen from "./screens/SwipeScreen";

const Tab = createBottomTabNavigator();

const App = () => {
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
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Swipe" component={SwipeScreen} />
    </Tab.Navigator>
  );
};

export default App;
