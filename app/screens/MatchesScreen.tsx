import React from "react";
import { View, Text, FlatList } from "react-native";

import { useMatch } from "../contexts/MatchContext";

import { StatusBar } from "expo-status-bar";

import styles from "../ui/styles";

const MatchesScreen = () => {
  const { matches } = useMatch();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Matches</Text>
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
