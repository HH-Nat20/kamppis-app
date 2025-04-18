import React from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import Container from "@/components/common/Container";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

import { getRoomProfileQueryOptions } from "@/api/queries/roomQueries";
import { useDeleteRoomProfileMutation } from "@/api/queries/roomMutations";

import { AlertTriangleIcon } from "lucide-react-native";

const DeleteRoom = () => {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();

  const {
    data: room,
    isPending: isRoomPending,
    isError: isRoomError,
  } = useQuery(getRoomProfileQueryOptions(Number(roomId)));

  const { mutate: deleteRoom, isPending: isDeleting } =
    useDeleteRoomProfileMutation(Number(roomId));

  const handleDelete = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this room? This action is permanent.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "DELETE ROOM",
          onPress: async () => {
            deleteRoom(undefined, {
              onSuccess: () => {
                router.replace("/rooms");
              },
            });
          },
          style: "destructive",
        },
      ]
    );
  };

  if (isRoomPending) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isRoomError || !room) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 text-lg">Failed to load room info</Text>
      </View>
    );
  }

  return (
    <Container>
      <View className="flex-1 justify-center items-center p-4 mt-10">
        <AlertTriangleIcon size={48} color="red" />
        <Heading className="text-red-600 mt-4 mb-2 text-center">
          Danger Zone
        </Heading>
        <Text className="text-gray-600 text-center mb-6 max-w-md">
          Deleting this room is permanent and cannot be undone. The room will no
          longer be available, and all data will be lost.
        </Text>
        <Text className="text-error-600 text-center mb-6 max-w-md">
          NOTE: Even the flat will be removed, if this is the last room in the
          flat.
        </Text>

        <Button
          variant="solid"
          size="lg"
          className="mt-2 bg-error-200 w-full max-w-[300px]"
          onPress={handleDelete}
        >
          <ButtonText className="text-white font-bold">DELETE ROOM</ButtonText>
        </Button>
      </View>
    </Container>
  );
};

export default DeleteRoom;
