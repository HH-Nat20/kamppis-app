import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { ChatStackParamList } from "../navigation/ChatStackNavigator";

import dao from "../ajax/dao";

import { Match, MatchUser } from "../types/Match";
import { MessageDTO, ChatMessage } from "../types/Chat";

import * as Stomp from "@stomp/stompjs";
import { IMessage } from "@stomp/stompjs";
import Chat from "@codsod/react-native-chat";
import { useUser } from "../contexts/UserContext";

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
  const [DUMMY_LOGGED_IN_USER, setDUMMY_LOGGED_IN_USER] = useState<number>(
    user?.id || 1
  );
  const { userId } = route.params;
  const [match, setMatch] = useState<Match>();
  const [recipent, setRecipent] = useState<MatchUser>();
  const [you, setYou] = useState<MatchUser>();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);

  useEffect(() => {
    setDUMMY_LOGGED_IN_USER(user?.id || 1);
  }, [user]);

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

      // Clear messages when switching to a new match
      setMessages([]);
    });
  }, [userId]);

  useEffect(() => {
    const client = new Stomp.Client({
      // brokerURL: "ws://localhost:8080/ws",
      // brokerURL: "ws://10.0.2.2:8080/ws", // For Android Emulator
      brokerURL: "ws://95.217.239.74:8087/ws", // Deployed to hellmanstudios.fi

      // ! THESE TWO LINES ARE NEEDED FOR STOMP OVER WEBSOCKETS IN ANDROID !
      // https://stomp-js.github.io/workaround/stompjs/rx-stomp/react-native-additional-notes.html
      forceBinaryWSFrames: true,
      appendMissingNULLonIncoming: true,

      onConnect: (frame) => {
        console.log("Connected: " + frame);

        // Subscribe to messages
        subscribeToMatch(client);
      },
      onDisconnect: () => console.log("Disconnected"),
      debug: (msg) => console.log(msg),
    });
    client.activate();
    setStompClient(client);
  }, [match]);

  const subscribeToMatch = (client: Stomp.Client) => {
    if (!client) {
      console.warn("Stomp client not initialized");
      return;
    }

    client.subscribe(
      `/user/matches/${match?.id}/messages`,
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

  const onSendMessage = (text: string) => {
    if (stompClient && stompClient.connected && text) {
      const sendingMessage = {
        content: text,
        senderEmail: you?.email, // Email only
        matchId: match?.id, // Match ID for backend processing
        createdAt: new Date().toISOString(),
      };
      // Clients send messages to ("/app/matches/{matchId}/messages")
      stompClient.publish({
        destination: `/app/matches/${match?.id}/messages`,
        body: JSON.stringify(sendingMessage),
        headers: { email: you?.email || "" }, // Add user email to headers
      });
    }
  };

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
          "https://fastly.picsum.photos/id/54/3264/2176.jpg?hmac=blh020fMeJ5Ru0p-fmXUaOAeYnxpOPHnhJojpzPLN3g"
        }
        // showEmoji={true}
        // onPressEmoji={() => console.log("Emoji Button Pressed..")}
        // showAttachment={true}
        // onPressAttachment={() => console.log("Attachment Button Pressed..")}
        timeContainerColor="red"
        timeContainerTextColor="white"
        // onEndReached={() => alert("You have reached the end of the page")}
      />
    </SafeAreaView>
  );
}
