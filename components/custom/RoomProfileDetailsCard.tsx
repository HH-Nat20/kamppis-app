import React from "react";
import { useQuery } from "@tanstack/react-query";

import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { RoomProfile } from "@/types/responses/RoomProfile";
import { getRoommateQueryOptions } from "@/api/queries/roommateQuery";

import { RoommateList } from "../common/RoommateList";

export const RoomProfileDetailsCard = ({
  profile,
}: {
  profile: RoomProfile;
}) => {
  if (!profile) {
    return null;
  }

  const { data: roommateUsers = [] } = useQuery(
    getRoommateQueryOptions(profile.userIds!)
  );

  return (
    <Card className="p-0 rounded-lg m-auto bg-transparent w-full mt-3">
      <Box className="flex-row mb-4">
        <VStack>
          <Text className="text-lg text-typography-900 mb-1">
            {profile.flat.name}
          </Text>
          <Text className="text-md text-typography-700">{profile.bio}</Text>
        </VStack>
      </Box>

      <Box className="my-5 flex-col">
        <VStack className="flex-row gap-2 pb-2">
          <Text className="text-lg text-typography-700">Rent</Text>
          <Text className="text-lg text-typography-300">€{profile.rent}</Text>
        </VStack>
        <Divider orientation="horizontal" className="my-2 bg-background-300" />
        <VStack className="flex-row gap-2 pb-2">
          <Text className="text-lg text-typography-700">Private Room</Text>
          <Text className="text-lg text-typography-300">
            {profile.isPrivateRoom ? "✅" : "❌"}
          </Text>
        </VStack>
        <Divider orientation="horizontal" className="my-2 bg-background-300" />
        <VStack className="flex-row gap-2 pb-2">
          <Text className="text-lg text-typography-700">Furnished</Text>
          <Text className="text-lg text-typography-300">
            {profile.furnished ? "✅" : "❌"}
          </Text>
          {profile.furnished && (
            <Text className="text-lg text-typography-300">
              {profile.furnishedInfo}
            </Text>
          )}
        </VStack>
        <Divider orientation="horizontal" className="my-2 bg-background-300" />
        <VStack className="flex-row gap-2 pb-2">
          <Text className="text-lg text-typography-700">Rooms Available</Text>
          <Text className="text-lg text-typography-300">
            {profile.flat.totalRoommates - profile.userIds!.length}
          </Text>
        </VStack>
      </Box>

      {roommateUsers.length > 0 && <RoommateList roommates={roommateUsers} />}
    </Card>
  );
};
