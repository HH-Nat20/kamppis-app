import React from "react";
import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Button } from "react-native";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/Ov23lih1jrZvsLs8CGUC",
};

export default function GitHubAuthButton({
  onCodeReceived,
}: {
  onCodeReceived: (code: string) => void;
}) {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "Ov23lih1jrZvsLs8CGUC",
      scopes: ["identity"],
      redirectUri: makeRedirectUri({
        scheme: "kamppis-app",
        path: "redirect",
      }),
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      if (code) {
        console.log("GitHub OAuth Code:", code);
        onCodeReceived(code); // Pass the code to the parent component
      }
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login as a real user"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
