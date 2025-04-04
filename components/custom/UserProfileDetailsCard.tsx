import React from "react";

import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { UserProfile } from "@/types/responses/UserProfile";

import { getProfilePicture, getImageUrl } from "@/helpers/helpers";

export const UserProfileDetailsCard = ({
  profile,
}: {
  profile: UserProfile;
}) => {
  return (
    <Card className="p-6 rounded-lg max-w-[360px] m-3">
      <Box className="flex-row mb-4">
        <VStack>
          <Heading size="md" className="mb-1">
            {profile.user.firstName}
          </Heading>
          <Text size="sm">{profile.bio}</Text>
        </VStack>
      </Box>

      <Box className="my-5 flex-col">
        <VStack className="items-start pb-2">
          <Heading size="xs">Gender</Heading>
          <Text size="xs">{profile.user.gender}</Text>
        </VStack>
        <Divider orientation="horizontal" className="my-2 bg-background-300" />
        <VStack className="items-start pb-2">
          <Heading size="xs">Age</Heading>
          <Text size="xs">{profile.user.age}</Text>
        </VStack>
        <Divider orientation="horizontal" className="my-2 bg-background-300" />
      </Box>
    </Card>
  );
};
