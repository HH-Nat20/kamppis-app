import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import styles from "../ui/styles";

import { LinearGradient } from "expo-linear-gradient";

import dao from "../ajax/dao";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../navigation/HomeStackNavigator";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../contexts/UserContext";

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
    // Check server status
    checkServerStatus();
    // Check database status
    checkDatabaseStatus();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(145, 46, 211, 1)",
          "rgba(103, 28, 151, 1)",
          "rgba(65, 16, 95, 1)",
          "rgba(47, 9, 69, 1)",
        ]}
        style={styles.background}
      />
      <Text style={styles.title}>App started</Text>

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
      <Text style={styles.info}>Logged in as: {user?.email}</Text>
      <Button title="Login as different user" onPress={handleOpenLogin} />
    </View>
  );
};

export default HomeScreen;
