import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

import Constants from "expo-constants";

const BACKEND_URL =
  Constants.expoConfig?.extra?.BACKEND_URL || "http://localhost:8080";
console.log("Using BACKEND_URL:", BACKEND_URL); // Debugging

const SERVER_URL = `${BACKEND_URL}/health`;
const DB_URL = `${BACKEND_URL}/db-health`;

const App = () => {
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

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  subtitle: { fontSize: 18, marginTop: 10 },
  status: { fontSize: 20, fontWeight: "bold", marginTop: 5 },
  ok: { color: "green" },
  failed: { color: "red" },
});

export default App;
