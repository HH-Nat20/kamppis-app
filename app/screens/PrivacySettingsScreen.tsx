import React from "react";

import { useUser } from "../contexts/UserContext";

import Container from "../components/Container";

import { FlashList } from "@shopify/flash-list";

import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";

const PrivacySettingsScreen = () => {
  const { user } = useUser();

  type Operation = {
    id: number;
    name: string;
    description: string;
    action: () => void;
  };

  const operations: Operation[] = [
    {
      id: 1,
      name: "Change Password",
      description: "Change your account password",
      action: () => {
        console.log("Change Password");
      },
    },
    {
      id: 2,
      name: "Delete Account",
      description: "Permanently delete your account",
      action: () => {
        console.log("Delete Account");
      },
    },
    {
      id: 3,
      name: "View Collected Data",
      description: "View the data we have collected about you",
      action: () => {
        console.log("View Collected Data");
      },
    },
  ];

  return (
    <Container>
      <View className="flex-1 items-center justify-center">
        <Text>Privacy Settings Screen</Text>
        <Text>User ID: {user?.id}</Text>
        <Text>User Name: {user?.firstName}</Text>
      </View>
      <FlashList
        data={operations}
        keyExtractor={(item: Operation) => item.id.toString()}
        renderItem={({ item }: { item: Operation }) => (
          <Pressable onPress={item.action}>
            <View className="p-4 border-b border-gray-200">
              <Text className="text-lg font-semibold">{item.name}</Text>
              <Text className="text-gray-500">{item.description}</Text>
            </View>
          </Pressable>
        )}
        estimatedItemSize={50}
        className="w-full"
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Container>
  );
};

export default PrivacySettingsScreen;
