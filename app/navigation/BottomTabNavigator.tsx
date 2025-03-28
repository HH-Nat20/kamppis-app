import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "tailwindcss/colors";

import ChatStackNavigator from "./ChatStackNavigator";
import HomeStackNavigator from "./HomeStackNavigator";
import SwipeStackNavigator from "./SwipeStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";
import DetailsScreen from "../screens/DetailsScreen";

const Tab = createBottomTabNavigator();

const hiddenTabRoutes = ["Details"];

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          paddingBottom: 5,
          height: 60,
          paddingTop: 5,
        },
        headerStyle: {
          backgroundColor: colors.transparent,
          elevation: 0,
        },
        headerShadowVisible: false,
        headerTitleStyle: {
          color: colors.teal[900],
          fontSize: 18,
        },
        tabBarActiveTintColor: colors.teal[500],
        tabBarInactiveTintColor: colors.gray[500],
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Profile") iconName = "person-outline";
          else if (route.name === "Swipe") iconName = "heart-half-outline";
          else if (route.name === "Matches") iconName = "people-outline";
          else if (route.name === "Chat") iconName = "chatbubbles-outline";
          else if (route.name === "Login") iconName = "log-in-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ headerShown: false, tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Swipe"
        component={SwipeStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerShown: true,
          tabBarItemStyle: { display: "none" },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
