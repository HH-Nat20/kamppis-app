import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from "@react-navigation/native";
import React from "react";
import { useEffect } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import Toast from "react-native-toast-message";
import styles from "@/assets/styles/styles";
import { router } from "expo-router";

type OAuthRedirectParams = {
  redirect: {
    code?: string;
  };
};

export default function OAuthRedirectScreen() {
  const route = useRoute<RouteProp<OAuthRedirectParams, "redirect">>();
  // This screen is used to handle the redirect from the OAuth provider
  // and extract the authorization code from the URL.
  // You can use this code to exchange it for an access token.
  // For now, we will just log the URL and show a message.

  useEffect(() => {
    if (!route.params?.code) {
      console.log("No code found in the URL");
      return;
    }

    console.log("Github OAuth Code:", route.params.code);

    Toast.show({
      type: "success",
      text1: "Authentication successful",
      text2: `Code: ${route.params.code}`,
    });

    // Redirect to the home screen after showing the toast
    setTimeout(() => {
      router.push({
        pathname: "/login",
      });
    }, 3000);
  }, [route.params]);

  return (
    <View>
      <Text style={styles.info}>Processing GitHub Login...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}
