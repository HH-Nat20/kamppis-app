import React from "react";
import { View, Text, FlatList } from "react-native";

import { useMatch } from "../contexts/MatchContext";

import { StatusBar } from "expo-status-bar";

import { LinearGradient } from "expo-linear-gradient";

import styles from "../ui/styles";

const MatchesScreen = () => {
  const { matches } = useMatch();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Matches</Text>
      <LinearGradient
        colors={[
          "rgba(145, 46, 211, 1)",
          "rgba(103, 28, 151, 1)",
          "rgba(65, 16, 95, 1)",
          "rgba(47, 9, 69, 1)",
        ]}
        style={styles.background}
      />
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.firstName} {item.lastName}
          </Text>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
};

export default MatchesScreen;
