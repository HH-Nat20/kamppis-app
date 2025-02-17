import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { ChatStackParamList } from "../navigation/ChatStackNavigator";

type ChatScreenRouteProp = RouteProp<ChatStackParamList, "ChatScreen">;

type ChatScreenProps = {
  route: ChatScreenRouteProp;
};

const ChatScreen: React.FC<ChatScreenProps> = ({ route }) => {
  const { userId } = route.params;

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Chat with User {userId}
      </Text>
    </SafeAreaView>
  );
};

export default ChatScreen;
