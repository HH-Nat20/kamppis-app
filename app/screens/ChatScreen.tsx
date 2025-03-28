import React, { useState, useEffect } from "react";
import { SafeAreaView, ActivityIndicator } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { ChatStackParamList } from "../navigation/ChatStackNavigator";

import dao from "../ajax/dao";

import { Match, MatchUser } from "../types/Match";
import { User } from "../types/responses/User";
import { MessageDTO, ChatMessage } from "../types/Chat";

import * as Stomp from "@stomp/stompjs";
import { IMessage } from "@stomp/stompjs";
import Chat from "@codsod/react-native-chat";
import { useUser } from "../contexts/UserContext";
import { useMatch } from "../contexts/MatchContext";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "../ui/styles";
import colors from "../ui/colors";

type ChatScreenRouteProp = RouteProp<ChatStackParamList, "ChatScreen">;

type ChatScreenProps = {
  route: ChatScreenRouteProp;
};

const mapMessageDTOToChatMessage = (dto: MessageDTO): ChatMessage => {
  return {
    _id: dto.id,
    text: dto.content,
    createdAt: new Date(dto.createdAt), // Convert string to Date
    user: {
      _id: dto.senderId,
      name: dto.senderEmail.split("@")[0], // Extract a simple name from the email for now
    },
  };
};

export default function ChatScreen({ route }: ChatScreenProps) {
  const { user } = useUser();
  const { matches } = useMatch();

  const navigation = useNavigation<StackNavigationProp<ChatStackParamList>>();

  useEffect(() => {
    if (user?.id !== DUMMY_LOGGED_IN_USER) {
      console.warn("User changed, redirecting to Matches screen");
      navigation.navigate("Matches"); // Redirect to Matches screen
    }
  }, [user]);

  const [DUMMY_LOGGED_IN_USER, setDUMMY_LOGGED_IN_USER] = useState<number>(
    user?.id || 1
  );

  const { matchId, user: recipent } = route.params;

  const [you, setYou] = useState<User>();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);

  useEffect(() => {
    setDUMMY_LOGGED_IN_USER(user?.id || 1);
  }, [user]);

  useEffect(() => {
    if (!recipent || !user) return;
    setYou(user);
    setMessages([]);
  }, [recipent, user]);

  useEffect(() => {
    if (!matchId || !you?.email) return;

    const client = new Stomp.Client({
      brokerURL: "wss://kamppis.hellmanstudios.fi/ws",
      forceBinaryWSFrames: true,
      appendMissingNULLonIncoming: true,
      onConnect: () => {
        client.subscribe(
          `/user/matches/${matchId}/messages`,
          (message: IMessage) => {
            const dto: MessageDTO = JSON.parse(message.body);
            setMessages((prev) =>
              prev.find((m) => m._id === dto.id)
                ? prev
                : [...prev, mapMessageDTOToChatMessage(dto)]
            );
          },
          { email: you.email }
        );
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [matchId, you?.email]);

  const onSendMessage = (text: string) => {
    if (stompClient?.connected && text) {
      stompClient.publish({
        destination: `/app/matches/${matchId}/messages`,
        body: JSON.stringify({
          content: text,
          senderEmail: you!.email,
          matchId,
          createdAt: new Date().toISOString(),
        }),
        headers: { email: you!.email },
      });
    }
  };

  const subscribeToMatch = (client: Stomp.Client) => {
    if (!client) {
      console.warn("Stomp client not initialized");
      return;
    }

    client.subscribe(
      `/user/matches/${recipent?.id}/messages`,
      (message: IMessage) => {
        console.log("Received message as IMessage:", message.body);
        const messageDTO: MessageDTO = JSON.parse(message.body);
        const chatMessage: ChatMessage = mapMessageDTOToChatMessage(messageDTO);

        // Prevent duplicate messages based on the message ID
        setMessages((prevMessages) => {
          if (prevMessages.find((msg) => msg._id === chatMessage._id)) {
            return prevMessages; // Don't add duplicate messages
          }
          return [...prevMessages, chatMessage]; // Add new message
        });
      },
      { email: you?.email || "" } // Add user email to headers
    );
  };

  if (!recipent || !you) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={colors.white} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Chat
        messages={messages.toReversed()}
        setMessages={(val) => onSendMessage(val)}
        themeColor="orange"
        themeTextColor="white"
        showSenderAvatar={false}
        showReceiverAvatar={true}
        inputBorderColor="orange"
        user={{
          _id: you?.id || 1,
          name: you?.email.split("@")[0] || "You",
        }}
        backgroundColor="white"
        inputBackgroundColor="white"
        placeholder="Enter Your Message"
        placeholderColor="gray"
        backgroundImage={
          "https://picsum.photos/200/300?random=" + // TODO: Something nicer
          Math.floor(Math.random() * 100)
        }
        //showEmoji={true}
        //onPressEmoji={() => console.log("Emoji Button Pressed..")}
        // showAttachment={true}
        // onPressAttachment={() => console.log("Attachment Button Pressed..")}
        timeContainerColor="red"
        timeContainerTextColor="white"
        // onEndReached={() => alert("You have reached the end of the page")}
      />
    </SafeAreaView>
  );
}
