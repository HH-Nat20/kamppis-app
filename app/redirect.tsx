import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import styles from "@/assets/styles/styles";

export default function RedirectScreen() {
  const { code } = useLocalSearchParams(); // Get ?code= from URL

  useEffect(() => {
    if (code) {
      // Store the code before redirecting
      AsyncStorage.setItem("githubAuthCode", code as string).then(() => {
        console.log("GitHub Auth Code Saved:", code);
      });
    }

    const timeout = setTimeout(() => {
      router.push({
        pathname: "/",
        params: {
          code: code as string,
        },
      });
    }, 1000); // Redirect after 1 second

    return () => clearTimeout(timeout);
  });

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-800">
      <Text style={styles.info}>Authentication processed. Redirecting ...</Text>
    </SafeAreaView>
  );
}
