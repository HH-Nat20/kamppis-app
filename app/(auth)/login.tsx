import React, { useEffect, useState } from "react";
import { ActionSheetIOS, Platform } from "react-native";
import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useUser } from "@/contexts/UserContext";
import { getUsers } from "@/api/dao_users";
import { User } from "@/types/responses/User";
import Container from "@/components/common/Container";

import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Heading } from "@/components/ui/heading";

import { router } from "expo-router";

export default function LoginScreen() {
  const { changeUser } = useUser();
  const [selectedUserLabel, setSelectedUserLabel] =
    useState<string>("Select a user");
  const [isAndroidPickerVisible, setAndroidPickerVisible] =
    useState<boolean>(false);

  /** This query key is not in queryKeys.ts because it's just for testing purposes */
  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const handleLogin = async (user: User) => {
    try {
      const response = await fetch(
        `https://kamppis.hellmanstudios.fi/api/login?email=${encodeURIComponent(
          user.email
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      const token = data.token;
      if (!token) throw new Error("No token received");

      await AsyncStorage.setItem("jwtToken", token);
      changeUser(user.id);

      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const openUserPickerIOS = () => {
    if (users?.length === 0) return;
    const options = users?.map((user) => user.email).concat("Cancel");
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: options.length - 1,
      },
      (buttonIndex) => {
        if (buttonIndex < users.length) {
          const user = users[buttonIndex];
          setSelectedUserLabel(user.email);
          handleLogin(user);
        }
      }
    );
  };

  const openUserPickerAndroid = () => {
    setAndroidPickerVisible(true);
  };

  const selectUserAndroid = (user: User) => {
    setSelectedUserLabel(user.email);
    setAndroidPickerVisible(false);
    handleLogin(user);
  };

  return (
    <Container>
      <VStack className="items-center gap-6 mt-10">
        <Heading>Select a user to login</Heading>

        <Pressable
          className="border rounded-md px-4 py-2"
          onPress={
            Platform.OS === "ios" ? openUserPickerIOS : openUserPickerAndroid
          }
        >
          <Text>{selectedUserLabel}</Text>
        </Pressable>

        {Platform.OS === "android" && isAndroidPickerVisible && (
          <VStack className="w-full px-4">
            {users.map((user) => (
              <Pressable
                key={user.id}
                className="py-3 border-b border-gray-200"
                onPress={() => selectUserAndroid(user)}
              >
                <Text>{user.email}</Text>
              </Pressable>
            ))}
            <Button onPress={() => setAndroidPickerVisible(false)}>
              <ButtonText>Cancel</ButtonText>
            </Button>
          </VStack>
        )}
      </VStack>
    </Container>
  );
}
