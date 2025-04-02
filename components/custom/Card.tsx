import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import styles from "@/assets/styles/styles";
import { ProfileCard } from "@/types/ProfileCard";
import { getProfilePicture, getImageUrl } from "@/helpers/helpers";

import ProfileTitle from "../common/ProfileTitle";
import TagArea from "../common/TagArea";

import { router } from "expo-router";

interface CardProps {
  card: ProfileCard;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const [tapped, setTapped] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { width, height } = Dimensions.get("window");

  const handleOpenDetails = () => {
    router.push({
      pathname: "/swiper/[profileId]",
      params: { profileId: card.profile.id },
    });
  };

  useEffect(() => {
    const photo = getProfilePicture(card.profile?.photos);
    const url = getImageUrl(photo);
    setImageUrl(url);
  }, [card]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Pressable
        onPress={() => setTapped(!tapped)}
        style={[styles.cardContainer, { width, height }]}
      >
        <ImageBackground
          source={{ uri: imageUrl ?? "" }}
          style={{ width, height }}
          onLoadEnd={() => setImageLoaded(true)}
        >
          {!imageLoaded ? (
            <View
              style={{
                width,
                height,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#000",
              }}
            >
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : (
            <View style={[styles.overlay, { width, height }]}>
              <ProfileTitle card={card} onPress={() => handleOpenDetails()} />
              <TagArea profile={card.profile} />
            </View>
          )}
        </ImageBackground>
      </Pressable>
    </SafeAreaView>
  );
};

export default Card;
