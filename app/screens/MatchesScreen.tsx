import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

import { useMatch } from "../contexts/MatchContext";
import { getProfilePicture } from "../helpers/helpers";

import styles from "../ui/styles";
import { useUser } from "../contexts/UserContext";

type ChatStackParamList = {
  Matches: undefined;
  ChatScreen: { userId: number };
};

type MatchesScreenNavigationProp = NativeStackNavigationProp<
  ChatStackParamList,
  "Matches"
>;

const MatchesScreen = () => {
  const { matches } = useMatch();
  const { user } = useUser();
  const navigation = useNavigation<MatchesScreenNavigationProp>();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Ensure loading is set to false after fetching
    setLoading(false);
  }, [matches, user]);

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
      <Text style={styles.header}>Matches for {user?.email}</Text>
      <LinearGradient
        colors={[
          "rgba(145, 46, 211, 1)",
          "rgba(103, 28, 151, 1)",
          "rgba(65, 16, 95, 1)",
          "rgba(47, 9, 69, 1)",
        ]}
        style={styles.background}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : matches.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No matches yet. Keep swiping!</Text>
        </View>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default MatchesScreen;
