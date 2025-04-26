import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { BadgeCheckIcon } from "lucide-react-native";

import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

import { useMatch } from "@/contexts/MatchContext";
import { getProfilePicture, getImageUrl } from "@/helpers/helpers";

import styles from "@/assets/styles/styles";
import { bgGradient } from "@/assets/styles/colors";

import { useUser } from "@/contexts/UserContext";
import { User } from "@/types/responses/User";

import { Heading } from "@/components/ui/heading";

import { router, Redirect } from "expo-router";

import { useActionSheet } from "@expo/react-native-action-sheet";
import { removeUserFromMatch } from "@/api/dao_matches";
import Toast from "react-native-toast-message";
import { postFeedback } from "@/api/dao_misc";

const MatchesScreen = () => {
  const { matches } = useMatch();
  const { user } = useUser();

  const { refreshMatches } = useMatch();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Ensure loading is set to false after fetching
    setLoading(false);
  }, [matches]);

  if (!user) {
    return <Redirect href="/login" />;
  }

  const handleOpenChat = (matchId: number, users: User[]) => {
    console.log(
      "Opening chat with users:",
      users?.map((user) => user.id).join(", ")
    );
    router.push({
      pathname: "/chat/[matchId]",
      params: { matchId },
    });
  };

  const handleRemoveMatch = (matchId: number) => {
    console.log("Removing match:", matchId, "for user:", user?.id);
    removeUserFromMatch(matchId, user!.id).then((response) => {
      if (response) {
        console.log("Match removed successfully:", response);
        refreshMatches();
        Toast.show({
          type: "success",
          text1: "Match removed successfully!",
        });
      } else {
        console.error("Error removing match:", response);
        Toast.show({
          type: "error",
          text1: "Error removing match.",
        });
      }
    });
  };

  const handleViewProfile = (profileId: number) => {
    console.log("Viewing profile:", profileId);
    router.push({
      pathname: "/[profileId]",
      params: { profileId },
    });
  };

  const handleReportAndRemoveMatch = (matchId: number) => {
    console.log("Reporting and removing match:", matchId);
    const reportMessage = `User ${user?.id} reported match ${matchId}`;
    postFeedback(user!.id, reportMessage).then((response) => {
      if (response) {
        console.log("Match reported successfully:", response);
        handleRemoveMatch(matchId);
        Toast.show({
          type: "success",
          text1: "Match reported successfully!",
        });
      } else {
        console.error("Error reporting match:", response);
        Toast.show({
          type: "error",
          text1: "Error reporting match.",
        });
      }
    });
  };

  const confirmRemoveMatch = (matchId: number, report: boolean = false) => {
    const action = report ? "report and remove" : "remove";

    Alert.alert(
      `Are you sure you want to ${action} this match?`,
      `You will no longer be able to enter this chat.`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            if (report) {
              handleReportAndRemoveMatch(matchId);
            } else {
              handleRemoveMatch(matchId);
            }
          },
        },
      ]
    );
  };

  const { showActionSheetWithOptions } = useActionSheet();

  const handleLongPress = (matchId: number, id: number) => {
    console.log("Long Pressed Match ID:", matchId);

    const options = ["View Profile", "Remove Match", "Report Match", "Cancel"];
    const destructiveButtonIndex = [1, 2];
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            handleViewProfile(id);
            break;
          case 1:
            confirmRemoveMatch(matchId, false);
            break;
          case 2:
            confirmRemoveMatch(matchId, true);
            break;
          case 3:
          // Cancel
        }
      }
    );
  };

  const renderItem = ({ item }: any) => {
    console.log("RENDERING ITEM", item);
    const userPhoto =
      getProfilePicture(item.users[0].roomProfiles[0]?.photos) ??
      getProfilePicture(item.users[0].userProfile.photos); // TODO: Fix this to show the photo of the profile (can be room profile or user profile)

    return (
      <TouchableOpacity
        style={styles.matchItem}
        onPress={() => handleOpenChat(item.matchId, item.users)}
        onLongPress={() =>
          handleLongPress(
            item.matchId,
            item.users[0].roomProfiles[0]?.id ?? item.users[0].id
          )
        } // TODO: Fix this to show the user profile or room profile of the match
      >
        {item.users.some((user: User) => user.isOnline) ? (
          <Badge
            size="sm"
            variant="solid"
            action="success"
            className="absolute top-2 left-2 z-10 ml-1"
          >
            <BadgeText>Online</BadgeText>
            <BadgeIcon as={BadgeCheckIcon} className="ml-1" />
          </Badge>
        ) : (
          <Badge
            size="sm"
            variant="solid"
            action="error"
            className="absolute top-2 left-2 z-10 ml-1"
          >
            <BadgeText>Offline</BadgeText>
            <BadgeIcon as={BadgeCheckIcon} className="ml-1" />
          </Badge>
        )}

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
          <Text style={styles.name}>
            {item.users?.map((user: User) => user.firstName).join(", ")}
          </Text>
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
      <View style={{ position: "absolute", bottom: 120, left: 10, right: 0 }}>
        <Text style={styles.info}>Long press on match to see options!</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default MatchesScreen;
