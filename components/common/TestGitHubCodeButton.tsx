import React from "react";
import { Button } from "react-native";
import Toast from "react-native-toast-message";

export default function TestGitHubCodeButton({
  code,
}: {
  code: string | null;
}) {
  // This button is used to test the GitHub code received from the OAuth flow.
  return (
    <Button
      title="Test GitHub Code"
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

          Toast.show({
            type: "success",
            text1: "GitHub code exchanged to JWT successfully",
            text2: `Woohooo! 🎉`,
          });
        } catch (error) {
          console.error("Error exchanging the GitHub code into JWT:", error);
          Toast.show({
            type: "error",
            text1: "Error exchanging the GitHub code into JWT",
            text2:
              error instanceof Error
                ? error.message
                : "An unknown error occurred",
          });
        }
      }}
    />
  );
}
