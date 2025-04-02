import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SwipeScreen from "../app/screens/SwipeScreen";
import colors from "../assets/styles/colors";

export type SwipeParamList = {
  Swipe: undefined;
};

const Stack = createStackNavigator<SwipeParamList>();

const SwipeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
          height: 50,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="Swipe"
        component={SwipeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SwipeStackNavigator;
