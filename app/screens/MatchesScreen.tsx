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
import { getProfilePicture, getImageUrl } from "../helpers/helpers";

import styles from "../ui/styles";
import { bgGradient } from "../ui/colors";

import { useUser } from "../contexts/UserContext";

type ChatStackParamList = {
  Matches: undefined;
  ChatScreen: { userId: number; userName: string };
};

type MatchesScreenNavigationProp =
  NativeStackNavigationProp<ChatStackParamList>;

const MatchesScreen = () => {
  const { matches } = useMatch();
  const { user } = useUser();
  const navigation = useNavigation<MatchesScreenNavigationProp>();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Ensure loading is set to false after fetching
    setLoading(false);
    console.log("USER IS ", user);
  }, [matches]);

  const handleOpenChat = (userId: number, firstName: string) => {
    navigation.navigate("ChatScreen", { userId, userName: firstName });
  };

  const renderItem = ({ item }: any) => {
    const userPhoto = getProfilePicture(item.userPhotos);

    return (
      <TouchableOpacity
        style={styles.matchItem}
        onPress={() => handleOpenChat(item.id, item.firstName)}
      >
        {userPhoto ? (
          <Image
            source={{ uri: getImageUrl(userPhoto) }}
            style={styles.image}
          />
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
      <LinearGradient colors={bgGradient} style={styles.background} />

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
