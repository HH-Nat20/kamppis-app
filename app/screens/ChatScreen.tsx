import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { ChatStackParamList } from "../navigation/ChatStackNavigator";

import dao from "../ajax/dao";

import { Match, MatchUser } from "../types/Match";
import { User } from "../types/User";

type ChatScreenRouteProp = RouteProp<ChatStackParamList, "ChatScreen">;

type ChatScreenProps = {
  route: ChatScreenRouteProp;
};

const ChatScreen: React.FC<ChatScreenProps> = ({ route }) => {
  const DUMMY_LOGGED_IN_USER = 2;
  const { userId } = route.params;
  const [match, setMatch] = useState<Match>();
  const [recipent, setRecipent] = useState<MatchUser>();
  const [you, setYou] = useState<MatchUser>();

  useEffect(() => {
    dao.getMatches(DUMMY_LOGGED_IN_USER).then((matches) => {
      const userMatches = matches.filter((match) => {
        return (
          (match.users[0]?.id === userId &&
            match.users[1]?.id === DUMMY_LOGGED_IN_USER) ||
          (match.users[1]?.id === userId &&
            match.users[0]?.id === DUMMY_LOGGED_IN_USER)
        );
      });

      if (userMatches.length === 0) {
        console.warn("No matches found");
        return;
      }

      const match = userMatches[0];
      setMatch(match);

      const recipent = match.users.find((user) => user?.id === userId);
      setRecipent(recipent);

      const you = match.users.find((user) => user?.id === DUMMY_LOGGED_IN_USER);
      setYou(you);

      console.log("Matches:", userMatches);
      console.log("Recipent:", recipent);
      console.log("You:", you);
    });
  }, [userId]);

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Chat with User {recipent?.email}
      </Text>
    </SafeAreaView>
  );
};

export default ChatScreen;
