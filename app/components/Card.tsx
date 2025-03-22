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
import styles from "../ui/styles";
import { renderTagBgColor } from "../ui/colors";
import { ProfileCard } from "../types/ProfileCard";
import { getProfilePicture, getImageUrl } from "../helpers/helpers";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DetailsParamList } from "../navigation/SwipeStackNavigator";

interface CardProps {
  card: ProfileCard;
}

type DetailScreenNavigationProp = NativeStackNavigationProp<
  DetailsParamList,
  "DetailsScreen"
>;

const Card: React.FC<CardProps> = ({ card }) => {
  const [tapped, setTapped] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const navigation = useNavigation<DetailScreenNavigationProp>();
  const { width, height } = Dimensions.get("window");

  const handleOpenDetails = (userId: number) => {
    navigation.navigate("DetailsScreen", {
      userId,
      userName: card.user?.firstName || "",
      profileId: card.profile!.id,
    });
  };

  useEffect(() => {
    const photo = getProfilePicture(card.profile?.photos);
    const url = getImageUrl(photo);
    setImageUrl(url);
  }, [card]);

  const content = (
    <View style={[styles.overlay, { width, height }]}>
      <Text
        style={styles.cardTitle}
        onPress={() => handleOpenDetails(card.user?.id)}
      >
        {card.user?.firstName}, {card.user?.age}{" "}
        <AntDesign name="infocirlceo" size={24} color="white" />
      </Text>
      <View style={styles.tagArea}>
        {card.profile &&
          "lifestyle" in card.profile &&
          card.profile.lifestyle.map((tag, index) => (
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
    </View>
  );

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
            content
          )}
        </ImageBackground>
      </Pressable>
    </SafeAreaView>
  );
};

export default Card;
