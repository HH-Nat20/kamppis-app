import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DetailsScreen from "../screens/DetailsScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import LoginScreen from "../screens/LoginScreen";

export type RootParamList = {
  Tabs: undefined;
  Login: undefined;
  DetailsScreen: {
    userName: string;
    profileId: string;
  };
};

const RootStack = createStackNavigator<RootParamList>();

const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Tabs" // TODO: Change to login screen when login is implemented
      screenOptions={{ headerShown: false }}
    >
      <RootStack.Screen
        name="Tabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={({ route }) => ({
          title: route.params.userName || "Profile",
          headerShown: true,
        })}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
