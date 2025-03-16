import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";

import dao from "../ajax/dao";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "../navigation/HomeStackNavigator";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../contexts/UserContext";

import styles from "../ui/styles";

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
      <Button
        title="Test Image Upload"
        onPress={() => navigation.navigate("Upload")}
      />
    </View>
  );
};

export default HomeScreen;
