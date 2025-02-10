import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "../ui/styles";

import { LinearGradient } from "expo-linear-gradient";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";
const SERVER_URL = `${BACKEND_URL}/health`;
const DB_URL = `${BACKEND_URL}/db-health`;

const HomeScreen = () => {
  const [serverStatus, setServerStatus] = useState<"loading" | "ok" | "failed">(
    "loading"
  );
  const [dbStatus, setDbStatus] = useState<"loading" | "ok" | "failed">(
    "loading"
  );

  useEffect(() => {
    // Check server status
    fetch(SERVER_URL)
      .then((res) =>
        res.ok ? setServerStatus("ok") : setServerStatus("failed")
      )
      .catch(() => setServerStatus("failed"));

    // Check database status
    fetch(DB_URL)
      .then((res) => (res.ok ? setDbStatus("ok") : setDbStatus("failed")))
      .catch(() => setDbStatus("failed"));
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
    </View>
  );
};

export default HomeScreen;
