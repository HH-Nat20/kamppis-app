import React from "react";
import {
  createStackNavigator,
} from "@react-navigation/stack";
import SwipeScreen from "../screens/SwipeScreen";
import DetailsScreen from "../screens/DetailsScreen";

export type DetailsParamList = {
  Swipe: undefined;
  DetailsScreen: { userId: number };
};

const Stack = createStackNavigator<DetailsParamList>();

const SwipeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Swipe"
        component={SwipeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SwipeStackNavigator;
