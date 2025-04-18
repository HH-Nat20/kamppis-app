import React, { useState } from "react";
import { Link, router } from "expo-router";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

import { useUser } from "@/contexts/UserContext";

import { RoomProfile } from "@/types/responses/RoomProfile";

import { InviteResponse } from "@/types/responses/Invite";

import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/api/queries/queryKeys";

import Toast from "react-native-toast-message";

import dao from "@/api/dao";

export default function JoinModal() {
  const isPresented = router.canGoBack();

  const queryClient = useQueryClient();

  const { user } = useUser();

  const [inviteCode, setInviteCode] = useState("");
  const handleJoinRoom = async () => {
    if (!inviteCode || !user) return;

    try {
      const inviteResponse: InviteResponse = await dao.joinRoomProfile(
        inviteCode
      );

      queryClient.invalidateQueries({
        queryKey: queryKeys.user(user.id),
      });

      Toast.show({
        type: "success",
        text1: "Join Room",
        text2: inviteResponse.message,
      });

      console.log("Join room response:", inviteResponse);

      router.back();
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000040",
      }}
    >
      {/* Dismiss modal when pressing outside */}
      {isPresented ? (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => router.back()}
        />
      ) : (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => router.push("/")}
        />
      )}

      {/* Modal content */}

      <Animated.View
        entering={SlideInDown}
        style={{
          width: "95%",
          height: "80%",
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white", // change to reflect dark/light mode
        }}
      >
        <Text style={{ fontWeight: "bold", marginBottom: 10, marginTop: 10 }}>
          Join Room
        </Text>

        <Animated.View
          entering={FadeIn}
          style={{
            flex: 1,
            alignSelf: "flex-end",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, marginBottom: 20, width: "80%" }}>
            This will join a shared room using the invite code you provide.
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 20, width: "80%" }}>
            You will also join the flat associated with this room, unless you
            already have a flat registered.
          </Text>
          <TextInput
            placeholder="Invite Code"
            value={inviteCode}
            onChangeText={setInviteCode}
            style={{
              width: "80%",
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              borderRadius: 5,
              paddingLeft: 10,
            }}
          />

          <TouchableOpacity
            onPress={handleJoinRoom}
            disabled={!inviteCode}
            style={{
              marginTop: 20,
              backgroundColor: !inviteCode ? "#ccc" : "#007AFF",
              padding: 10,
              borderRadius: 5,
              width: "80%",
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Join Room
            </Text>
          </TouchableOpacity>

          {isPresented && (
            <Link href="../" style={{ marginTop: 20 }}>
              <Text style={{ color: "#007AFF" }}>Cancel</Text>
            </Link>
          )}
        </Animated.View>

        {/* Dismiss button on top right */}
        {isPresented && (
          <Link
            style={{
              padding: 10,
              position: "absolute",
              top: 5,
              right: 10,
              fontWeight: "bold",
            }}
            href="../"
          >
            X
          </Link>
        )}
      </Animated.View>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </Animated.View>
  );
}
