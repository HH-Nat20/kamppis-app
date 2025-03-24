import React from "react";
import { View, Text } from "react-native";
import { ProfileCard } from "../types/ProfileCard";
import styles from "../ui/styles";
import { renderTagBgColor } from "../ui/colors";

const TagArea: React.FC<{ card: ProfileCard }> = ({ card }) => {
  const tags: string[] = [];
  if (card.profile && "lifestyle" in card.profile) {
    tags.push(...card.profile.lifestyle);
  }
  if (card.profile && "flat" in card.profile && card.profile.flat) {
    tags.push(...card.profile.flat.flatUtilities);
  }
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
          {tag.replaceAll("_", " ")}
        </Text>
      ))}
    </View>
  );
};

export default TagArea;
