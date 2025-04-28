import React from "react";

import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { UserProfile } from "@/types/responses/UserProfile";

export const UserProfileDetailsCard = ({
  profile,
}: {
  profile: UserProfile;
}) => {
  return (
    <Card className="p-0 rounded-lg m-auto bg-transparent w-full">
      <Box className="flex-row mb-4">
        <VStack>
          <Heading size="md" className="mb-1">
            {profile.user.firstName}
          </Heading>
          <Text size="sm">{profile.bio}</Text>
        </VStack>
      </Box>

      <Box className="my-5 flex-col">
        <VStack className="flex-row gap-2 pb-2">
          <Text className="text-lg text-typography-700">Gender</Text>
          <Text className="text-lg text-typography-300">
            {profile.user.gender}
          </Text>
        </VStack>
        <VStack className="flex-row gap-2 pb-2">
          <Text className="text-lg text-typography-700">Age</Text>
          <Text className="text-lg text-typography-300">
            {profile.user.age}
          </Text>
        </VStack>
      </Box>
    </Card>
  );
};
