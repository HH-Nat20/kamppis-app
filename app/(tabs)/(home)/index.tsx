import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { useQueries } from "@tanstack/react-query";

import { useUser } from "@/contexts/UserContext";
import {
  getServerHealthQuery,
  getDatabaseHealthQuery,
} from "@/api/queries/healthQueries";

import Container from "@/components/common/Container";

import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { StatusBar } from "expo-status-bar";

import * as Linking from "expo-linking";
import GitHubAuthButton from "@/components/common/GitHubAuthButton";

import { router, useLocalSearchParams } from "expo-router";
import LoginWithGitHubButton from "@/components/common/LoginWithGitHubButton";
import Toast from "react-native-toast-message";
import { Space } from "lucide-react-native";
import { HealthStatus } from "@/components/common/HealthStatus";

const HomeScreen = () => {
  const { user, changeUser } = useUser();

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

  // useEffect(() => {
  //   // Fetch the stored GitHub auth code
  //   const getAuthCode = async () => {
  //     const storedCode = await AsyncStorage.getItem("githubAuthCode");
  //     if (storedCode) {
  //       console.log("Retrieved GitHub Code:", storedCode);
  //       setAuthCode(storedCode);
  //     }
  //   };

  //   getAuthCode();
  // }, []);

  const handleCodeReceived = (code: string) => {
    // console.log("Received GitHub auth code:", code);
    setAuthCode(code); // Store the code in state or send it to your backend
    Toast.show({
      type: "success",
      text1: "Authentication successful",
      text2: `GitHub Code: ${code}`,
    });
  };

  const { signupSuccess } = useLocalSearchParams();

  useEffect(() => {
    if (signupSuccess) {
      Toast.show({
        type: "success",
        text1: "Welcome to Kamppis 🎉",
        text2: "You are now logged in!",
      });
    }
  }, [signupSuccess]);

  const { code } = useLocalSearchParams();

  return (
    <Container>
      {/** Temporary solution for not being able to center vertically */}
      <VStack className="items-center justify-center gap-4 mt-4 py-4"></VStack>
      {!code && (
        <View
          style={{
            backgroundColor: "#f0f0f0",
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 8,
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            top: 50,
            right: 10,
          }}
        >
          <Text style={{ fontSize: 14, color: "#666" }}>Logged in as: </Text>
          <Text style={{ fontWeight: "bold", color: "#333" }}>
            {user?.email}
          </Text>
        </View>
      )}
      <VStack className="items-center justify-center gap-4 mt-4 py-4"></VStack>
      <VStack className="items-center justify-center gap-4 mt-4 py-4">
        {!code && (
          <>
            <Space className="h-4" />

            <Space className="h-4" />
            <Heading>Welcome to Kämppis!</Heading>
            <Image
              source={require("@/assets/images/kamppis-app.png")}
              className="w-32 h-32 rounded-full"
            />
            <Button onPress={handleOpenLogin} className="mt-6">
              <ButtonText>Select a test user</ButtonText>
            </Button>
          </>
        )}
        {!code && (
          <HealthStatus serverHealth={serverHealth} dbHealth={dbHealth} />
        )}
        <Space className="h-4" />
        {/** This button is only shown if the code is not in the localsearchparams */}
        {!code && <GitHubAuthButton onCodeReceived={handleCodeReceived} />}
        {/** These buttons are only shown if the code is in the localsearchparams */}
        {code && (
          <>
            <LoginWithGitHubButton
              code={code as string}
              changeUser={changeUser}
            />
            <Text className="mt-2">OR</Text>
            <Button
              onPress={() =>
                router.push({
                  pathname: "/(auth)/signup",
                })
              }
              className="mt-2"
            >
              <ButtonText>Create a new account</ButtonText>
            </Button>
          </>
        )}
      </VStack>
      <StatusBar style="auto" />
    </Container>
  );
};

export default HomeScreen;
