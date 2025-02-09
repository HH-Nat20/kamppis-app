import React from "react";
import { View, Text, FlatList } from "react-native";
import { User } from "../types/user";

type MatchesScreenProps = {
  matches: User[];
};

const MatchesScreen = ({ matches }: MatchesScreenProps) => {
  return (
    <View>
      <Text>Matches</Text>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.firstName} {item.lastName}
          </Text>
        )}
      />
    </View>
  );
};

export default MatchesScreen;
