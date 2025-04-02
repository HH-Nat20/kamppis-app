import React from "react";
import { Avatar, AvatarImage, AvatarBadge } from "@/components/ui/avatar";

import ProfileDrawerLayout from "@/components/custom/ProfileDrawerLayout";

import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Edit } from "lucide-react-native";
import { Center } from "@/components/ui/center";
import { Pressable } from "@/components/ui/pressable";

import { Card } from "@/components/ui/card";

import colors from "tailwindcss/colors";

import { useProfileDrawer } from "@/contexts/ProfileDrawerContext";

import { useUser } from "@/contexts/UserContext";
import { getImageUrl, getProfilePicture } from "@/helpers/helpers";

import { useNavigation, router } from "expo-router";

import TagArea from "@/components/common/TagArea";

export default function ProfileScreen() {
  const { openDrawer } = useProfileDrawer();
  const { user } = useUser();

  return (
    <ProfileDrawerLayout>
      <VStack className="h-full w-full pb-8" space="sm">
        <Center className="mt-4 py-4 w-full md:px-10 pb-4 z-10">
          <VStack space="lg" className="items-center mt-4 py-4">
            <Pressable
              onPress={() => {
                router.push("/profile/photos");
              }}
            >
              <Avatar size="2xl" className="bg-primary-600">
                <AvatarImage
                  alt="Profile Image"
                  height={100}
                  width={100}
                  source={{
                    uri: getImageUrl(
                      getProfilePicture(user?.userProfile?.photos)
                    ),
                  }}
                />
                <AvatarBadge
                  style={{
                    backgroundColor: user?.isOnline
                      ? colors.green[600]
                      : colors.red[600],
                  }}
                />
              </Avatar>
            </Pressable>
            <VStack className="gap-1 w-full items-center">
              <Text size="2xl" className="font-roboto text-dark">
                {`${user?.firstName} ${user?.lastName}`}
              </Text>
              <Text className="font-roboto text-sm text-typograpphy-700">
                {user?.email}
              </Text>
              <TagArea profile={user?.userProfile!} />
              <Card className="w-1/2 px-4 py-2 bg-white dark:bg-black">
                <Text className="font-roboto text-sm text-typography-700">
                  {user?.userProfile?.bio}
                </Text>
              </Card>
            </VStack>
            <Button
              variant="outline"
              action="secondary"
              onPress={openDrawer}
              className="gap-3"
            >
              <ButtonText className="text-dark">Edit Profile</ButtonText>
              <ButtonIcon as={Edit} />
            </Button>
          </VStack>
        </Center>
      </VStack>
    </ProfileDrawerLayout>
  );
}
