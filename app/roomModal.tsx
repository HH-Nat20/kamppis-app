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
import { FlatForm } from "@/validation/flatFormSchema";
import { RoomProfileForm } from "@/validation/roomFormSchema";

import { Flat } from "@/types/responses/Flat";
import { RoomProfile } from "@/types/responses/RoomProfile";

import { Location } from "@/types/enums/LocationEnum";
import { Utilities } from "@/types/enums/UtilitiesEnum";

import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/api/queries/queryKeys";

import { useLocalSearchParams } from "expo-router";

import dao from "@/api/dao";

export default function RoomModal() {
  const { flatId } = useLocalSearchParams<{ flatId: string }>();

  const isPresented = router.canGoBack();

  const queryClient = useQueryClient();

  const { user } = useUser();

  const [roomName, setRoomName] = useState("");
  const handleCreateRoom = async () => {
    if (!roomName || !user) return;

    const newRoom: RoomProfileForm = {
      userIds: [user.id],
      name: roomName,
      flatId: Number(flatId),
      rent: 500,
      isPrivateRoom: true,
      furnished: false,
      bio: "Room description",
    };

    try {
      const createdRoom: RoomProfile = await dao.createRoomProfile(newRoom);
      console.log("Room created:", createdRoom);

      queryClient.setQueryData(
        queryKeys.roomProfile(createdRoom.id),
        createdRoom
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.user(user.id),
      });
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
          Create a Room
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
            This will create a new free room for users to swipe on. Flat used:{" "}
            {flatId}
          </Text>
          <TextInput
            placeholder="Room Name"
            value={roomName}
            onChangeText={setRoomName}
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
            onPress={handleCreateRoom}
            disabled={!roomName}
            style={{
              marginTop: 20,
              backgroundColor: !roomName ? "#ccc" : "#007AFF",
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
              Create Room
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
