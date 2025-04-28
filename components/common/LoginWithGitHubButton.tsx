import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { Alert, Button } from "react-native";
import Toast from "react-native-toast-message";

export default function LoginWithGitHubButton({
  code,
  changeUser,
}: {
  code: string | null;
  changeUser: (userId: number) => void;
}) {
  return (
    <Button
      title="Login with GitHub Code"
      onPress={async () => {
        if (!code) {
          console.warn("No code found");
          Toast.show({
            type: "error",
            text1: "No GitHub code found",
            text2: `Maybe try authenticating again? 🤷‍♀️`,
          });
          return;
        }

        try {
          const response = await fetch(
            `https://kamppis.hellmanstudios.fi/api/login/github?code=${encodeURIComponent(
              code
            )}`,
            {
              method: "POST",
            }
          );

          if (!response.ok)
            throw new Error(
              `${response.status}: ${JSON.stringify(response.body)}`
            );
          const data = await response.json();
          const token = data.token;
          AsyncStorage.setItem("jwtToken", token);

          const userId = data.userId;
          changeUser(userId); // Update the user context with the new user ID

          Toast.show({
            type: "success",
            text1: "GitHub code exchanged to JWT successfully",
            text2: `Woohooo! 🎉`,
          });

          setTimeout(() => {
            router.push("/");
          }, 2000); // Redirect after 2 seconds
        } catch (error: any) {
          console.error("Error exchanging the GitHub code into JWT:", error);

          Alert.alert("Error", error.message, [
            {
              text: "OK",
              onPress: () => {
                router.push("/");
              },
            },
          ]);
        }
      }}
    />
  );
}
