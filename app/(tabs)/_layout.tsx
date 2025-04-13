import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "tailwindcss/colors";

import { Tabs } from "expo-router";

import { ProfileDrawerProvider } from "@/contexts/ProfileDrawerContext";

const TabsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProfileDrawerProvider>
      <Tabs
        initialRouteName="profile"
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
        })}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="rooms"
          options={{
            headerShown: false,
            tabBarLabel: "Rooms",
            title: "Rooms",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="(swiper)"
          options={{
            headerShown: false,
            tabBarLabel: "Swiper",
            title: "Swiper",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="(matches)"
          options={{
            headerShown: false,
            tabBarLabel: "Matches",
            title: "Matches",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubble" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </ProfileDrawerProvider>
  );
};

export default TabsLayout;
