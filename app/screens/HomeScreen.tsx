import React, { useState } from "react";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQueries } from "@tanstack/react-query";

import { useUser } from "../../contexts/UserContext";
import { HomeStackParamList } from "../../navigation/HomeStackNavigator";
import {
  getServerHealthQuery,
  getDatabaseHealthQuery,
} from "../../api/queries/healthQueries";

import TestJWTButton from "../../components/common/TestJWTButton";
import Container from "../../components/common/Container";

import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Center } from "@/components/ui/center";

import { router } from "expo-router";
import * as Linking from "expo-linking";
import GitHubAuthButton from "../../components/common/GitHubAuthButton";

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList, "Home">>();
  const { user } = useUser();

  const url = Linking.useURL();

  if (url) {
    const { hostname, path, queryParams } = Linking.parse(url);

    console.log(
      `Linked to app with hostname: ${hostname}, path: ${path} and data: ${JSON.stringify(
        queryParams
      )}`
    );
  }

  const results = useQueries({
    queries: [getServerHealthQuery, getDatabaseHealthQuery],
  });

  const [serverHealth, dbHealth] = results;

  const handleOpenLogin = () => {
    navigation.navigate("Login");
  };

  const [authCode, setAuthCode] = useState<string | null>(null);

  const handleCodeReceived = (code: string) => {
    console.log("Received GitHub auth code:", code);
    setAuthCode(code); // Store the code in state or send it to your backend
  };

  return (
    <Container>
      {/** Temporary solution for not being able to center vertically */}
      <VStack className="items-center justify-center gap-4 mt-4 py-4"></VStack>
      <VStack className="items-center justify-center gap-4 mt-4 py-4"></VStack>
      <VStack className="items-center justify-center gap-4 mt-4 py-4">
        <Heading>App started</Heading>
        <Text>User: {user?.email}</Text>

        <VStack className="items-center gap-2 mt-4">
          <Text>Checking server status...</Text>
          {serverHealth.isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text
              className={
                serverHealth.data?.status === "ok"
                  ? "text-success-500"
                  : "text-error-500"
              }
            >
              {serverHealth.data?.status === "ok" ? "OK" : "FAILED"}
            </Text>
          )}
        </VStack>

        <VStack className="items-center gap-2 mt-4">
          <Text>Checking DB status...</Text>
          {dbHealth.isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text
              className={
                dbHealth.data?.status === "ok"
                  ? "text-success-500"
                  : "text-error-500"
              }
            >
              {dbHealth.data?.status === "ok" ? "OK" : "FAILED"}
            </Text>
          )}
        </VStack>

        <Button onPress={handleOpenLogin} className="mt-6">
          <ButtonText>Login as different user</ButtonText>
        </Button>

        <Button
          onPress={() =>
            router.push({
              pathname: "/screens/LoginScreen",
            })
          }
          className="mt-6"
        >
          <ButtonText>Login Using Router</ButtonText>
        </Button>

        <Button
          onPress={() =>
            router.push({
              pathname: "/profile/[user]",
              params: { user: 1 },
            })
          }
          className="mt-6"
        >
          <ButtonText>Go to Test Route</ButtonText>
        </Button>

        <TestJWTButton />
        <GitHubAuthButton onCodeReceived={handleCodeReceived} />
      </VStack>
    </Container>
  );
};

export default HomeScreen;
