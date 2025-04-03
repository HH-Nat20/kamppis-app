import { router } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import React, { useEffect } from "react";
import styles from "@/assets/styles/styles";

export default function RedirectScreen() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push({
        pathname: "/",
      });
    }, 1000); // Redirect after 1 second

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-800">
      <Text style={styles.info}>Authentication processed. Redirecting ...</Text>
    </SafeAreaView>
  );
}
