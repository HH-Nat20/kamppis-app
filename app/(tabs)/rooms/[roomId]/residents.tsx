import React, { useState } from "react";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";

import { useLocalSearchParams, router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getRoomProfileQueryOptions } from "@/api/queries/roomQueries";
import { getRoommateQueryOptions } from "@/api/queries/roommateQuery";

import Container from "@/components/common/Container";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";

import { UserPlusIcon } from "lucide-react-native";

import { Card } from "@/components/ui/card";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { getProfilePicture, getImageUrl } from "@/helpers/helpers";

import dao from "@/api/dao";

const Residents = () => {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();

  const {
    data: room,
    isPending: isRoomPending,
    isError: isRoomError,
  } = useQuery(getRoomProfileQueryOptions(Number(roomId)));

  const {
    data: roommateUsers = [],
    isPending: isRoommatesPending,
    isError: isRoommatesError,
  } = useQuery({
    ...getRoommateQueryOptions(room?.userIds ?? []),
    enabled: !!room?.userIds?.length,
  });

  const [inviteCode, setInviteCode] = useState<string | null>(null);

  const generateInviteCode = async () => {
    if (!roomId) return;
    try {
      const response = await dao.getRoomProfileInvite(Number(roomId));
      setInviteCode(response.inviteToken);
    } catch (error) {
      console.error("Error fetching invite code:", error);
    }
  };

  const copyToClipboard = async () => {
    if (inviteCode) {
      await Clipboard.setStringAsync(inviteCode);
      Toast.show({
        type: "success",
        text1: "Invite Code Copied",
        text2: "The invite code has been copied to your clipboard.",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No invite code available.",
      });
    }
  };

  return (
    <Container>
      {isRoomPending || isRoommatesPending ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View className="flex-1 justify-center items-center p-4 mt-4">
          <Text className="text-xl font-bold">Flat Residents</Text>
          <Text className="text-gray-500">
            The following users have permission to edit this room
          </Text>

          {roommateUsers.map((user) => (
            <Card
              key={user.id}
              size="md"
              variant="outline"
              className="p-5 rounded-lg max-w-[360px] m-3"
            >
              <TouchableOpacity
                className="flex-row"
                onPress={() => {
                  router.push(`/${user.id}`);
                }}
              >
                <Avatar className="mr-3">
                  <AvatarFallbackText>RR</AvatarFallbackText>
                  <AvatarImage
                    source={{
                      uri: getImageUrl(
                        getProfilePicture(user.userProfile.photos),
                        "thumbnail"
                      ),
                    }}
                    alt="image"
                  />
                </Avatar>
                <VStack>
                  <Heading size="sm" className="mb-1">
                    {`${user.firstName} ${user.lastName}`}
                  </Heading>
                  <Text size="sm">{user.email}</Text>
                </VStack>
              </TouchableOpacity>
            </Card>
          ))}

          <Button className="mt-4" onPress={generateInviteCode}>
            <UserPlusIcon size={24} color="#fff" />
            <ButtonText>Invite Resident</ButtonText>
          </Button>

          {inviteCode && (
            <>
              <Text className="text-black-500 dark:text-white mt-4">
                Invite Code
              </Text>
              <Input className="mt-4" isDisabled={true}>
                <InputField
                  value={inviteCode}
                  className="border border-gray-300 rounded-lg p-2"
                />
              </Input>
              <Button className="mt-4" onPress={copyToClipboard}>
                <ButtonText>Copy Invite Code</ButtonText>
              </Button>
              <Text className="text-black-500 dark:text-white mt-4">
                Share this code with your friends to invite them to the room.
              </Text>
            </>
          )}
        </View>
      )}
    </Container>
  );
};

export default Residents;
