import React from "react";
import {
  createStackNavigator,
} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import SwipeScreen from "../screens/SwipeScreen";
import DetailsScreen from "../screens/DetailsScreen";

import colors from "../ui/colors";

export type DetailsParamList = {
  Swipe: undefined;
  DetailsScreen: { userId: number; userName: string };
};

const Stack = createStackNavigator<DetailsParamList>();

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
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={({ route }: { route: RouteProp<DetailsParamList, "DetailsScreen"> }) => ({
          title: route.params.userName || "Profile",
        })}
      />
    </Stack.Navigator>
  );
};

export default SwipeStackNavigator;
