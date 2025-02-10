import React from "react";
import { View, Text, FlatList } from "react-native";
import { User } from "../types/user";

import { StatusBar } from "expo-status-bar";

import styles from "../ui/styles";

type MatchesScreenProps = {
  matches: User[];
};

const MatchesScreen = ({ matches }: MatchesScreenProps) => {
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
