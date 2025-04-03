import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useQueries } from "@tanstack/react-query";

import { useUser } from "@/contexts/UserContext";
import {
  getServerHealthQuery,
  getDatabaseHealthQuery,
} from "@/api/queries/healthQueries";

import TestJWTButton from "@/components/common/TestJWTButton";
import Container from "@/components/common/Container";

import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";

import * as Linking from "expo-linking";
import GitHubAuthButton from "@/components/common/GitHubAuthButton";

import { Link, RelativePathString, router } from "expo-router";

const HomeScreen = () => {
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
    router.push({
      pathname: "/login",
    });
  };

  const [authCode, setAuthCode] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the stored GitHub auth code
    const getAuthCode = async () => {
      const storedCode = await AsyncStorage.getItem("githubAuthCode");
      if (storedCode) {
        console.log("Retrieved GitHub Code:", storedCode);
        setAuthCode(storedCode);
      }
    };

    getAuthCode();
  }, []);

  const handleCodeReceived = (code: string) => {
    console.log("Received GitHub auth code:", code);
    setAuthCode(code); // Store the code in state or send it to your backend
    Toast.show({
      type: "success",
      text1: "Authentication successful",
      text2: `GitHub Code: ${code}`,
    });
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
        {/** withAnchor is necessary for the swiper to still work after using this link, */}
        {/** if used before the swiper is loaded */}
        <Link href={`/1`} withAnchor>
          Test Link to Profile 1
        </Link>
        <TestJWTButton />
        <GitHubAuthButton onCodeReceived={handleCodeReceived} />
        <TestGitHubCodeButton code={authCode} />

        <Button
          onPress={() =>
            router.push({
              pathname: "/(auth)/signup",
            })
          }
          className="mt-6"
        >
          <ButtonText>Sign up</ButtonText>
        </Button>
      </VStack>
    </Container>
  );
};

export default HomeScreen;
