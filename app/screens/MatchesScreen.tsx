import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

import { useMatch } from "../contexts/MatchContext";

import { getProfilePicture } from "../helpers/helpers";

import styles from "../ui/styles";

// Define navigation types for the Chat Stack
type ChatStackParamList = {
  Matches: undefined;
  ChatScreen: { userId: number };
};

// Define a type for navigation
type MatchesScreenNavigationProp = NativeStackNavigationProp<
  ChatStackParamList,
  "Matches"
>;

const MatchesScreen = () => {
  const { matches } = useMatch();
  const navigation = useNavigation<MatchesScreenNavigationProp>();

  const handleOpenChat = (userId: number) => {
    navigation.navigate("ChatScreen", { userId });
  };

  const renderItem = ({ item }: any) => {
    const userPhoto = getProfilePicture(item.userPhotos);

    return (
      <TouchableOpacity
        style={styles.matchItem}
        onPress={() => handleOpenChat(item.id)}
      >
        {userPhoto ? (
          <Image source={{ uri: userPhoto }} style={styles.image} />
        ) : (
          <View style={[styles.image, styles.placeholder]}>
            <Text style={styles.placeholderText}>No Photo</Text>
          </View>
        )}
        <View style={styles.overlay}>
          <Text style={styles.name}>{item.firstName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Matches</Text>
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
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default MatchesScreen;
