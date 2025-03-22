import React from "react";
import { Text } from "react-native";

import { UserProfile } from "../types/responses/UserProfile";
import { RoomProfile } from "../types/responses/RoomProfile";
import { ProfileCard } from "../types/ProfileCard";
import Entypo from "@expo/vector-icons/Entypo";

import styles from "../ui/styles";
import colors from "../ui/colors";

interface ProfileTitleProps {
  card: ProfileCard;
  onPress?: () => void;
}

const ProfileTitle: React.FC<ProfileTitleProps> = ({
  card,
  onPress,
}: ProfileTitleProps) => {
  const profile = card.profile as UserProfile | RoomProfile;

  if (!profile) {
    return null;
  }

  const profileType = profile && "userIds" in profile ? "home" : "user";
  const iconColor = "white";

  return (
    <Text style={styles.cardTitle} onPress={onPress}>
      <Entypo
        name={profileType}
        size={24}
        color={iconColor}
        style={{
          marginRight: 5,
          backgroundColor:
            profileType === "home" ? colors.quatenary : colors.tertiary,
          borderRadius: 10,
          padding: 5,
        }}
      />{" "}
      {profileType === "user"
        ? `${card.user.firstName}, ${card.user.age}`
        : `${card.profile.bio.substring(0, 20)}...`}{" "}
      {/** TODO: Put something better than bio snippet here? */}
    </Text>
  );
};

export default ProfileTitle;
