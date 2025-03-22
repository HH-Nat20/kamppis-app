import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";

import { Photo } from "../types/responses/Photo";
import { Box } from "@/components/ui/box";

import styles from "../ui/styles";

import { getImageUrl } from "../helpers/helpers";

interface PortraitProps {
  photo: Photo;
}

const Portrait = ({ photo }: { photo: Photo }) => {
  return (
    <Box className="w-full aspect-square overflow-hidden rounded-lg">
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
        source={{
          uri: getImageUrl(photo, "thumbnail"),
        }}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    </Box>
  );
};

export default Portrait;
