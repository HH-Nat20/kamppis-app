import React from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQueries } from "@tanstack/react-query";

import { useUser } from "../contexts/UserContext";
import { HomeStackParamList } from "../navigation/HomeStackNavigator";
import styles from "../ui/styles";
import {
  getServerHealthQuery,
  getDatabaseHealthQuery,
} from "../queries/healthQueries";

import TestJWTButton from "../components/TestJWTButton";

const Separator = () => <View style={styles.separator} />;

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList, "Home">>();
  const { user } = useUser();

  const results = useQueries({
    queries: [getServerHealthQuery, getDatabaseHealthQuery],
  });

  const [serverHealth, dbHealth] = results;

  const handleOpenLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>App started</Text>
      <Separator />
      <Text style={styles.subtitle}>User: {user?.email}</Text>
      <Separator />

      <Text style={styles.subtitle}>Checking server status...</Text>
      {serverHealth.isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text
          style={[
            styles.status,
            serverHealth.data?.status === "ok" ? styles.ok : styles.failed,
          ]}
        >
          {serverHealth.data?.status === "ok" ? "OK" : "FAILED"}
        </Text>
      )}

      <Text style={styles.subtitle}>Checking DB status...</Text>
      {dbHealth.isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text
          style={[
            styles.status,
            dbHealth.data?.status === "ok" ? styles.ok : styles.failed,
          ]}
        >
          {dbHealth.data?.status === "ok" ? "OK" : "FAILED"}
        </Text>
      )}

      <Separator />
      <Button title="Login as different user" onPress={handleOpenLogin} />
      <Separator />
      <TestJWTButton />
    </View>
  );
};

export default HomeScreen;
