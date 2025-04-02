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

import { useMatch } from "../../contexts/MatchContext";
import { getProfilePicture, getImageUrl } from "../../helpers/helpers";

import styles from "../../assets/styles/styles";
import { bgGradient } from "../../assets/styles/colors";

import { useUser } from "../../contexts/UserContext";
import { User } from "../../types/responses/User";
import { UserProfile } from "../../types/responses/UserProfile";

import Container from "../../components/common/Container";
import { Heading } from "@/components/ui/heading";

type ChatStackParamList = {
  Matches: undefined;
  ChatScreen: { matchId: number; userName: string; user: User };
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
  }, [matches]);

  const handleOpenChat = (matchId: number, user: User) => {
    console.log("Opening chat with user:", user.id);
    navigation.navigate("ChatScreen", {
      matchId,
      userName: user.firstName,
      user,
    });
  };

  const renderItem = ({ item }: any) => {
    console.log("RENDERING ITEM", item);
    const userPhoto = getProfilePicture(item.user.userProfile.photos);

    return (
      <TouchableOpacity
        style={styles.matchItem}
        onPress={() => handleOpenChat(item.matchId, item.user)}
      >
        {userPhoto ? (
          <Image
            source={{ uri: getImageUrl(userPhoto, "thumbnail", item.id) }}
            style={styles.image}
          />
        ) : (
          <View style={[styles.image, styles.placeholder]}>
            <Text style={styles.placeholderText}>No Photo</Text>
          </View>
        )}
        <View style={styles.overlay}>
          <Text style={styles.name}>{item.user!.firstName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-800">
      <LinearGradient colors={bgGradient} style={styles.background} />

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : matches?.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Heading>No matches yet. Keep swiping!</Heading>
        </View>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(item) => item.matchId.toString()} // TODO: Make sure item.id is profileId and not userId!!!
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
