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
import styles from "../../assets/styles/styles";
import { ProfileCard } from "../../app/types/ProfileCard";
import { getProfilePicture, getImageUrl } from "../../helpers/helpers";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigation/RootNavigator";

import ProfileTitle from "../common/ProfileTitle";
import TagArea from "../common/TagArea";

interface CardProps {
  card: ProfileCard;
}

type DetailScreenNavigationProp = NativeStackNavigationProp<
  RootParamList,
  "DetailsScreen"
>;

const Card: React.FC<CardProps> = ({ card }) => {
  const [tapped, setTapped] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const navigation = useNavigation<DetailScreenNavigationProp>();
  const { width, height } = Dimensions.get("window");

  const handleOpenDetails = () => {
    navigation.navigate("DetailsScreen", {
      userName:
        "flat" in card.profile
          ? card.profile.flat.name
          : "firstName" in card.user
          ? card.user.firstName
          : "",
      profileId: card.profile!.id.toString(),
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
