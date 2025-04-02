import React from "react";

import { Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function TestJWTButton() {
  return (
    <Button
      title="Test JWT"
      onPress={async () => {
        const token = await AsyncStorage.getItem("jwtToken");
        if (!token) {
          console.warn("No token found");
          return;
        }

        try {
          const response = await fetch(
            `https://kamppis.hellmanstudios.fi/api/login/protected`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok)
            throw new Error(`Access denied: ${response.status}`);

          Toast.show({
            type: "success",
            text1: "Authentication successful",
            text2: `Woohooo! 🎉`,
          });
        } catch (error) {
          console.error("Error accessing protected endpoint:", error);
        }
      }}
    />
  );
}
