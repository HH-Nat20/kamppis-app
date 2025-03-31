import React from "react";
import { View, Text } from "react-native";
import { ProfileCard } from "../types/ProfileCard";
import { UserProfile } from "../types/responses/UserProfile";
import { RoomProfile } from "../types/responses/RoomProfile";
import styles from "../ui/styles";
import { renderTagBgColor } from "../ui/colors";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

const TagArea: React.FC<{ profile: UserProfile | RoomProfile }> = ({
  profile,
}) => {
  const tags: string[] = [];

  const profileType = profile?.type;

  if (profile && "lifestyle" in profile) {
    tags.push(...profile.lifestyle);
  }
  if (profile && "flat" in profile && profile.flat) {
    tags.push(...profile.flat.flatUtilities);
  }

  const renderTag = (tag: string) => {
    switch (tag) {
      case "PRIVATE_BATHROOM":
        return <MaterialIcons name="bathtub" size={24} color="white" />;
      case "SEPARATE_BATHROOM_AND_SHOWER":
        return <FontAwesome name="bathtub" size={24} color="white" />;
      case "BALCONY":
        return <MaterialIcons name="balcony" size={24} color="white" />;
      case "WIFI":
        return <AntDesign name="wifi" size={24} color="white" />;
      case "DISHWASHER":
        return (
          <MaterialCommunityIcons name="dishwasher" size={24} color="white" />
        );
      case "LAUNDRY_MACHINE":
        return (
          <MaterialCommunityIcons
            name="washing-machine"
            size={24}
            color="white"
          />
        );
      default:
        return tag.replace("_", " ");
    }
  };

  return (
    <View style={styles.tagArea}>
      {tags.map((tag, index) => (
        <Text
          key={index}
          style={{
            ...styles.tag,
            backgroundColor: renderTagBgColor(tag),
          }}
        >
          {renderTag(tag)}
        </Text>
      ))}
    </View>
  );
};

export default TagArea;
