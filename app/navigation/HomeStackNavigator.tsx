import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ImageUpload from "../screens/ImageUpload";

export type HomeStackParamList = {
  Home: undefined;
  Login: undefined;
  Upload: undefined; // TODO: Move this to the profiles stack
};

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Upload"
        component={ImageUpload}
        options={{ headerShown: true }}
        />
    </Stack.Navigator>
  );
}
