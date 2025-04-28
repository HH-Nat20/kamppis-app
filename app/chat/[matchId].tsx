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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from "zod";

const mapMessageDTOToChatMessage = (dto: MessageDTO): ChatMessage => {
  return {
    _id: dto.id,
    text: dto.content,
    createdAt: new Date(dto.createdAt), // Convert string to Date
    user: {
      _id: dto.senderId,
      name: [dto.senderFirstName, dto.senderLastName].join(" "), // Join first and last name
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

  const [token, setToken] = useState<string | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <>
            {recipients?.map((recipient, index) => (
              <Badge
                key={index}
                size="sm"
                variant="solid"
                action={recipient.isOnline ? "success" : "error"}
                className="ml-1"
              >
                <BadgeText>
                  {recipient.firstName}{" "}
                  {recipient.isOnline ? "Online" : "Offline"}
                </BadgeText>
                <BadgeIcon as={BadgeCheckIcon} className="ml-1" />
              </Badge>
            ))}
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
            Chat with{" "}
            {recipients?.map((recipient) => recipient.firstName).join(", ")}
          </Text>
        );
      },
    });
  }, [navigation, matchId, matches, recipients]);

  useEffect(() => {
    console.log("ChatScreen mounted with matchId:", matchId);

    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("jwtToken");
      if (!token) {
        console.warn("No token found");
        return;
      }
      setToken(token);
    };
    fetchToken();

    const relevantMatches = matches.filter(
      (match) => String(match.matchId) === String(matchId)
    );
    if (relevantMatches.length > 0) {
      const match = relevantMatches[0];
      setRecipientIds(
        match.users?.map((u) => u.id).filter((id) => id !== user?.id)
      );
      setRecipients(match.users?.filter((u) => u.id != user?.id));
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
  const [systemMessage, setSystemMessage] = useState<string | null>(null);

  useEffect(() => {
    setDUMMY_LOGGED_IN_USER(user?.id || 1);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    setYou(user);
  }, [user]);

  useEffect(() => {
    if (!matchId) return;
    setMessages([]);
  }, [matchId]);

  useEffect(() => {
    if (!matches || !matchId) return;

    const stillMatched = matches.some(
      (match) => String(match.matchId) === String(matchId)
    );

    if (!stillMatched) {
      setSystemMessage("The user has unmatched you.");
    } else {
      setSystemMessage(null);
    }
  }, [matches, matchId]);

  useEffect(() => {
    if (!matchId || !you?.email) return;
    const init = async () => {
      const storedToken = await AsyncStorage.getItem("jwtToken");
      if (!storedToken) {
        console.warn("No token found");
        return;
      }
      // console.log("Connecting to WebSocket with token:", storedToken);

      const client = new Stomp.Client({
        brokerURL: `wss://kamppis.hellmanstudios.fi/ws?token=${storedToken}`, // IMPORTANT: token is ALSO passed in the URL to be fetched before the header can be accessed
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
            { email: you.email, Authorization: `Bearer ${storedToken}` }
          );
        },
      });

      client.activate();
      setStompClient(client);

      return () => {
        client.deactivate();
      };
    };
    init();
  }, [matchId, you?.email]);

  const onSendMessage = (text: string) => {
    // console.log("Sending message with token:", token);

    if (stompClient?.connected && text) {
      stompClient.publish({
        destination: `/app/matches/${matchId}/messages`,
        body: JSON.stringify({
          content: text,
          senderEmail: you!.email,
          senderFirstName: you!.firstName,
          senderLastName: you!.lastName,
          matchId,
          createdAt: new Date().toISOString(),
        }),
        headers: { email: you!.email, Authorization: `Bearer ${token}` },
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
      { email: you?.email || "", Authorization: `Bearer ${token}` } // Add user email to headers
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
      {systemMessage && (
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: colors.danger,
            textAlign: "center",
            marginVertical: 10,
          }}
        >
          {systemMessage}
        </Text>
      )}
      <Chat
        messages={messages.toReversed()}
        setMessages={(val) => onSendMessage(val)}
        themeColor={colors.tertiary}
        themeTextColor="white"
        showSenderAvatar={false}
        showReceiverAvatar={false}
        inputBorderColor={colors.tertiary}
        user={{
          _id: you?.id || 1,
          name: you?.firstName || "You",
        }}
        showSenderName={recipients.length > 1}
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
