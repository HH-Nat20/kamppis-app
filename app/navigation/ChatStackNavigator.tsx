import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import MatchesScreen from "../screens/MatchesScreen";
import ChatScreen from "../screens/ChatScreen";
import { User } from "../types/responses/User";

import { colorSet } from "../ui/colors";

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
