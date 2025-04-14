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

import dao from "@/api/dao";

export default function Modal() {
  const isPresented = router.canGoBack();

  const queryClient = useQueryClient();

  const { user } = useUser();

  const [flatName, setFlatName] = useState("");

  const handleCreateFlat = async () => {
    if (!flatName || !user) return;
    const flatData: FlatForm = {
      name: flatName,
      totalRoommates: 1,
      description: "",
      location: Location.HELSINKI,
      petHousehold: false,
      flatUtilities: [] as Utilities[],
    };
    try {
      const newFlat: Flat = await dao.createFlat(flatData);
      console.log("Flat created:", newFlat);
      const flatId = newFlat.id;

      const newRoom: RoomProfileForm = {
        userIds: [user.id],
        name: `${flatName} - Room 1`,
        flatId: flatId,
        rent: 500,
        isPrivateRoom: true,
        furnished: false,
        bio: "Room description",
      };

      const createdRoom: RoomProfile = await dao.createRoomProfile(newRoom);
      console.log("Room created:", createdRoom);

      queryClient.setQueryData(queryKeys.flat(flatId), newFlat);
      queryClient.setQueryData(
        queryKeys.roomProfile(createdRoom.id),
        createdRoom
      );
      queryClient.invalidateQueries({
        queryKey: queryKeys.user(user.id),
      });
      router.back();
    } catch (error) {
      console.error("Error creating flat:", error);
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
          Create a Flat
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
            This will create a new flat and a free room for users to swipe on.
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 20 }}>
            You can add more rooms later.
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 20, color: "#ef0950" }}>
            Note: You can only own one flat at a time
          </Text>
          <TextInput
            placeholder="Flat Name"
            value={flatName}
            onChangeText={setFlatName}
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
            onPress={handleCreateFlat}
            disabled={!flatName}
            style={{
              marginTop: 20,
              backgroundColor: !flatName ? "#ccc" : "#007AFF",
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
              Create Flat
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
