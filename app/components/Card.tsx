import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  Pressable,
  Dimensions,
} from "react-native";
import styles from "../ui/styles";
import { renderTagBgColor } from "../ui/colors";
import { User } from "../types/User";
import { countAge, formatDate, getProfilePicture } from "../helpers/helpers";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface CardProps {
  card: User;
}

type DetailStackParamList = {
  DetailsScreen: { userId: number, userName: string };
};

type DetailScreenNavigationProp = NativeStackNavigationProp<
  DetailStackParamList
>;

const Card: React.FC<CardProps> = ({ card }) => {
  const [tapped, setTapped] = useState<boolean>(false);

  const navigation = useNavigation<DetailScreenNavigationProp>();

  const handleOpenDetails = (userId: number) => {
    navigation.navigate("DetailsScreen", { userId, userName: `${card.firstName} ${card.lastName}` });
  };

  // Get screen dimensions inside the component
  const { width, height } = Dimensions.get("window");

  return (
    <SafeAreaView style={styles.safeArea}>
      <Pressable
        onPress={() => setTapped(!tapped)}
        style={[styles.cardContainer, { width, height }]} // Apply dimensions dynamically
      >
        <ImageBackground
          source={{ uri: getProfilePicture(card.userPhotos) }}
          style={{ width, height }}
        >
          <View style={styles.overlay}>
            <Text style={styles.cardTitle} onPress={() => handleOpenDetails(card.id)}>
              {card.firstName}, {card.age} <AntDesign name="infocirlceo" size={24} color="white" />
            </Text>
            <View style={styles.tagArea}>
              {card.lifestyle.map((tag, index) => (
                <Text key={index} style={{...styles.tag, backgroundColor: renderTagBgColor(tag)}}>
                  {tag.replaceAll("_", " ")}
                </Text>
              ))}
            </View>
          </View>
        </ImageBackground>
      </Pressable>
    </SafeAreaView>
  );
};

export default Card;
