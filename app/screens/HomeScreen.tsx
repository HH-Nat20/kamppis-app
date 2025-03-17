import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";

import dao from "../ajax/dao";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../navigation/HomeStackNavigator";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../contexts/UserContext";

import styles from "../ui/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "Home"
>;

const Separator = () => <View style={styles.separator} />;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [serverStatus, setServerStatus] = useState<"loading" | "ok" | "failed">(
    "loading"
  );
  const [dbStatus, setDbStatus] = useState<"loading" | "ok" | "failed">(
    "loading"
  );
  const { user } = useUser();

  const handleOpenLogin = () => {
    navigation.navigate("Login");
  };

  const checkServerStatus = async () => {
    try {
      const health = await dao.getServerHealth();
      if (health.status === "ok") {
        setServerStatus("ok");
      } else {
        setServerStatus("failed");
      }
    } catch (error) {
      console.error("The server doesn't seem to be up", error);
      setServerStatus("failed");
    }
  };

  const checkDatabaseStatus = async () => {
    try {
      const health = await dao.getDatabaseHealth();
      if (health.status === "ok") {
        setDbStatus("ok");
      } else {
        setDbStatus("failed");
      }
    } catch (error) {
      console.error("The database doesn't seem to be up", error);
      setDbStatus("failed");
    }
  };

  useEffect(() => {
    checkServerStatus();
    checkDatabaseStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App started</Text>
      <Separator />
      <Text style={styles.subtitle}>User: {user?.email}</Text>
      <Separator />
      <Text style={styles.subtitle}>Checking server status...</Text>
      {serverStatus === "loading" ? (
        <ActivityIndicator />
      ) : (
        <Text
          style={[
            styles.status,
            serverStatus === "ok" ? styles.ok : styles.failed,
          ]}
        >
          {serverStatus === "ok" ? "OK" : "FAILED"}
        </Text>
      )}

      <Text style={styles.subtitle}>Checking DB status...</Text>
      {dbStatus === "loading" ? (
        <ActivityIndicator />
      ) : (
        <Text
          style={[styles.status, dbStatus === "ok" ? styles.ok : styles.failed]}
        >
          {dbStatus === "ok" ? "OK" : "FAILED"}
        </Text>
      )}
      <Separator />
      <Button title="Login as different user" onPress={handleOpenLogin} />

      <Separator />
      {/* Test auth token Button */}
      <Button
        title="Test JWT"
        onPress={async () => {
          // Get the token from AsyncStorage or SecureStore
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

            if (!response.ok) {
              throw new Error(`Access denied: ${response.status}`);
            }

            if (!token) {
              console.error("No token received");
              return;
            }
            console.log("Protected endpoint accessed successfully");
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
    </View>
  );
};

export default HomeScreen;
