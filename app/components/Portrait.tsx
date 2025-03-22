import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";

import { Photo } from "../types/responses/Photo";

import styles from "../ui/styles";

import { getImageUrl } from "../helpers/helpers";

interface PortraitProps {
  photo: Photo;
}

const Portrait: React.FC<PortraitProps> = ({ photo }) => {
  return (
    <View style={styles.portraitContainer}>
      {/* Background Placeholder (Always Visible) */}
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
        }}
        style={styles.portrait}
        resizeMode="cover"
      />

      {/* Actual Image (On Top) */}
      <Image
        source={{ uri: getImageUrl(photo, "thumbnail") }}
        style={styles.portrait}
      />
    </View>
  );
};

export default Portrait;
