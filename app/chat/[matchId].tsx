import React, { useState, useEffect, useLayoutEffect } from "react";
import { SafeAreaView, ActivityIndicator, Text } from "react-native";

import { User } from "@/types/responses/User";
import { MessageDTO, ChatMessage } from "@/types/Chat";

import * as Stomp from "@stomp/stompjs";
import { IMessage } from "@stomp/stompjs";
import Chat from "@codsod/react-native-chat";
import { useUser } from "@/contexts/UserContext";
import { useMatch } from "@/contexts/MatchContext";
import styles from "@/assets/styles/styles";
import colors from "@/assets/styles/colors";

import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { BadgeCheckIcon } from "lucide-react-native";

import { useLocalSearchParams, router, useNavigation } from "expo-router";

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

export default function ChatScreen() {
  const navigation = useNavigation();
  const { user } = useUser();
  const { matches } = useMatch();

  const { matchId } = useLocalSearchParams();

  const [recipientIds, setRecipientIds] = useState<number[]>([]);
  const [recipients, setRecipients] = useState<User[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <>
            {recipients[0]?.isOnline ? (
              <Badge
                size="sm"
                variant="solid"
                action="success"
                className="ml-1"
              >
                <BadgeText>Online</BadgeText>
                <BadgeIcon as={BadgeCheckIcon} className="ml-1" />
              </Badge>
            ) : (
              <Badge size="sm" variant="solid" action="error" className="ml-1">
                <BadgeText>Offline</BadgeText>
                <BadgeIcon as={BadgeCheckIcon} className="ml-1" />
              </Badge>
            )}
          </>
        );
      },
      headerTitle: () => {
        return (
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: colors.black,
            }}
          >
            Chat with {recipients?.map((recipient) => recipient.firstName)}
          </Text>
        );
      },
    });
  }, [navigation, matchId, matches, recipients]);

  useEffect(() => {
    console.log("ChatScreen mounted with matchId:", matchId);

    const relevantMatches = matches.filter(
      (match) => String(match.matchId) === String(matchId)
    );
    if (relevantMatches.length > 0) {
      const match = relevantMatches[0];
      setRecipientIds([match.user.id]);
      setRecipients([match.user]);
    } else {
      console.warn("No relevant matches found for matchId:", matchId);
    }
    if (user?.id !== DUMMY_LOGGED_IN_USER) {
      console.warn("User changed, redirecting to Matches screen");
      router.push({
        pathname: "/matches",
      }); // Redirect to Matches screen
    }
  }, [user]);

  const [DUMMY_LOGGED_IN_USER, setDUMMY_LOGGED_IN_USER] = useState<number>(
    user?.id || 1
  );

  const [you, setYou] = useState<User>();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);

  useEffect(() => {
    setDUMMY_LOGGED_IN_USER(user?.id || 1);
  }, [user]);

  useEffect(() => {
    if (!matches || !user) return;
    setYou(user);
    setMessages([]);
  }, [matches, user]);

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
      `/user/matches/${recipientIds[0]}/messages`,
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

  if (!matches || !you) {
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
          "https://images.unsplash.com/photo-1610730260505-0b9ed7f06293?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
