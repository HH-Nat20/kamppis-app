import React from "react";
import {
  createStackNavigator,
} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import MatchesScreen from "../screens/MatchesScreen";
import ChatScreen from "../screens/ChatScreen";

import { colorSet } from "../ui/colors";

export type ChatStackParamList = {
  Matches: undefined;
  ChatScreen: { userId: number, userName: string };
};

const Stack = createStackNavigator<ChatStackParamList>();

const ChatStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colorSet.darkBlue,
          height: 50,
        },
        headerTintColor: colorSet.white,
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="Matches"
        component={MatchesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={({ route }: { route: RouteProp<ChatStackParamList> }) => ({
                  title: route.params!.userName || "Chat",
                })}
      />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
