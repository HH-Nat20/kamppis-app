import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { RoomProfile } from "../types/responses/RoomProfile";
import { getRoommateQueryOptions } from "../queries/roommateQuery";

import { DetailsParamList } from "../navigation/SwipeStackNavigator";
import { StackNavigationProp } from "@react-navigation/stack";
import { RoommateList } from "./RoommateList";

export const RoomProfileDetailsCard = ({
  profile,
}: {
  profile: RoomProfile;
}) => {
  const navigation =
    useNavigation<StackNavigationProp<DetailsParamList, "DetailsScreen">>();

  const { data: roommateUsers = [] } = useQuery(
    getRoommateQueryOptions(profile.userIds!)
  );

  return (
    <Card className="p-6 rounded-lg max-w-[360px] m-3">
      <Box className="flex-row mb-4">
        <VStack>
          <Heading size="md" className="mb-1">
            {profile.flat.name}
          </Heading>
          <Text size="sm">{profile.bio}</Text>
        </VStack>
      </Box>

      <Box className="my-5 flex-col">
        <VStack className="flex-row gap-2 pb-2">
          <Heading size="xs">Rent</Heading>
          <Text size="xs">€{profile.rent}</Text>
        </VStack>
        <Divider orientation="horizontal" className="my-2 bg-background-300" />
        <VStack className="flex-row gap-2 pb-2">
          <Heading size="xs">Private Room</Heading>
          <Text size="xs">{profile.isPrivateRoom ? "✅" : "❌"}</Text>
        </VStack>
        <Divider orientation="horizontal" className="my-2 bg-background-300" />
        <VStack className="flex-row gap-2 pb-2">
          <Heading size="xs">Utilities</Heading>
          <Text size="xs">{profile.roomUtilities.join(", ")}</Text>
        </VStack>
        <Divider orientation="horizontal" className="my-2 bg-background-300" />
        <VStack className="flex-row gap-2 pb-2">
          <Heading size="xs">Rooms Available</Heading>
          <Text size="xs">
            {profile.totalRoommates - profile.userIds!.length}
          </Text>
        </VStack>
      </Box>

      {roommateUsers.length > 0 && <RoommateList roommates={roommateUsers} />}
    </Card>
  );
};
