import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import MatchesScreen from "../app/screens/MatchesScreen";
import ChatScreen from "../app/screens/ChatScreen";
import { User } from "../types/responses/User";

import { colorSet } from "../assets/styles/colors";

export type ChatStackParamList = {
  Matches: undefined;
  ChatScreen: { matchId: number; userName: string; user: User };
};

const Stack = createStackNavigator<ChatStackParamList>();

const ChatStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Matches"
        component={MatchesScreen}
        options={{ headerShown: true }}
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
