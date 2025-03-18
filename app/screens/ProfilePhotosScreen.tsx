import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { Switch } from "@/components/ui/switch";
import ContentBox from "../components/ContentBox";
import AddButton from "../components/AddButton";
import DeleteButton from "../components/DeleteButton";
import { useUser } from "../contexts/UserContext";
import styles from "../ui/styles";
import colors from "../ui/colors";
import { Photo } from "../types/Photo";
import Portrait from "../components/Portrait";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "../navigation/ProfileStackNavigator";

import dao from "../ajax/dao";

type ProfilePhotosNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "Upload"
>;

export default function ProfilePhotosScreen() {
  const { user, refreshUser } = useUser();

  const navigation = useNavigation<ProfilePhotosNavigationProp>();

  const handleDeletePress = (photo: Photo) => {
    console.log("Delete requested, opening modal...");
    Alert.alert("Delete Photo", "Are you sure you want to delete this photo?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Delete", onPress: () => confirmDelete(photo) },
    ]);
  };

  const confirmDelete = (photo: Photo) => {
    console.log("Delete photo", photo);
    dao.deleteImage(user, photo).then(() => {
      console.log("Photo deleted, refreshing user data...");
      Alert.alert("Photo Deleted", "Your photo has been deleted.");
      refreshUser();
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {user?.userPhotos?.map((photo, index) => (
          <ContentBox key={index}>
            <Portrait photo={photo} />
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Switch
                  value={photo.isProfilePhoto}
                  onValueChange={(value) => {
                    console.log("Change profile photo", photo, value);
                  }}
                />
                <Text style={{ color: colors.white }}>Profile Photo</Text>
              </View>
              <DeleteButton onPress={() => handleDeletePress(photo)} />
            </View>
          </ContentBox>
        ))}
      </ScrollView>

      <AddButton
        onPress={() => {
          console.log("Navigating to Upload screen...");
          navigation.navigate("Upload");
        }}
      />
    </SafeAreaView>
  );
}
