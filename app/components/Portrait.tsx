import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Image } from "react-native";

import { Photo } from "../types/Photo";

import styles from "../ui/styles";
import { colorSet } from "../ui/colors";

interface PortraitProps {
  photo: Photo;
}

const Portrait: React.FC<PortraitProps> = ({ photo }) => {
  const [imageLoading, setImageLoading] = useState<boolean>(true);

  useEffect(() => {
    setImageLoading(true);
  }, [photo]);

  return (
    <View style={styles.portraitContainer}>
      {imageLoading && (
        <ActivityIndicator
          size="large"
          color={colorSet.white}
          style={styles.imageLoader}
        />
      )}
      <Image
        source={{ uri: photo?.name }}
        style={styles.portrait}
        onLoad={() => setImageLoading(false)}
      />
    </View>
  );
};

export default Portrait;
