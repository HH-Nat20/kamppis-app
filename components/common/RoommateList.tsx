import React from "react";
import { View, Image, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import { User } from "@/types/responses/User";
import { getProfilePicture, getImageUrl } from "@/helpers/helpers";

import { router } from "expo-router";

interface RoommateListProps {
  roommates: User[];
}

export const RoommateList = ({ roommates }: RoommateListProps) => {
  if (!roommates || roommates.length === 0) return null;

  return (
    <View className="mt-4">
      <Text className="text-lg font-semibold mb-2">Living Here:</Text>
      <View className="flex-row gap-3 flex-wrap">
        {roommates.map((user) => (
          <Pressable
            key={user.id}
            onPress={() => {
              router.push({
                pathname: "/[profileId]",
                params: { profileId: user.id },
              });
            }}
            className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-300"
          >
            <Image
              source={{
                uri: getImageUrl(getProfilePicture(user.userProfile.photos)),
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
              <Text className="text-white text-xs text-center">
                {user.firstName}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};
