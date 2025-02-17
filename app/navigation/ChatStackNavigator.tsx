import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import MatchesScreen from "../screens/MatchesScreen";
import ChatScreen from "../screens/ChatScreen";

export type ChatStackParamList = {
  Matches: undefined;
  ChatScreen: { userId: number };
};

const Stack = createStackNavigator<ChatStackParamList>();

const ChatStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Matches"
        component={MatchesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;
