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
import { User } from "../types/User";
import { countAge, formatDate, getProfilePicture } from "../helpers/helpers";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface CardProps {
  card: User;
}

type DetailStackParamList = {
  DetailsScreen: { userId: number };
};

type DetailScreenNavigationProp = NativeStackNavigationProp<
  DetailStackParamList
>;

const renderBgColor = (tag: string) => {
  switch (tag) {
    case "STUDENT":
      return "#43AA8B";
    case "WORKING":
      return "#254441";
    case "PARTY_GOER":
      return "#DB504A";
    case "EARLY_BIRD":
      return "#0496FF";
    case "NIGHT_OWL":
      return "#FF6F59";
    default:
      return "#0F4C5C";
  }
}

const Card: React.FC<CardProps> = ({ card }) => {
  const [tapped, setTapped] = useState<boolean>(false);

  const navigation = useNavigation<DetailScreenNavigationProp>();

  const handleOpenDetails = (userId: number) => {
    navigation.navigate("DetailsScreen", { userId });
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
            <Text style={styles.cardTitle}>
              {card.firstName}, {card.age} <AntDesign onPress={() => handleOpenDetails(card.id)} name="infocirlceo" size={24} color="white" />
            </Text>
            <View style={styles.tagArea}>
              {card.lifestyle.map((tag, index) => (
                <Text key={index} style={{...styles.tag, backgroundColor: renderBgColor(tag)}}>
                  {tag.replaceAll("_", " ")}
                </Text>
              ))}
            </View>

            {tapped && (
              <View style={styles.cardContent}>
                <View style={styles.definitionBox}>

                  <View style={styles.definition}>
                    <Text style={styles.definitionText}>Full Name: </Text>
                    <Text style={styles.definitionValue}>
                      {card.firstName} {card.lastName}
                    </Text>
                  </View>

                  <View style={styles.definition}>
                    <Text style={styles.definitionText}>Age: </Text>
                    <Text style={styles.definitionValue}>
                      {card.age}
                    </Text>
                  </View>

                  <View style={styles.definition}>
                    <Text style={styles.definitionText}>Gender: </Text>
                    <Text style={styles.definitionValue}>{card.gender}</Text>
                  </View>

                  <View style={styles.definition}>
                    <Text style={styles.definitionValue}>
                      {card.bio || "No bio available"}
                    </Text>
                  </View>

                </View>
              </View>
            )}
          </View>
        </ImageBackground>
      </Pressable>
    </SafeAreaView>
  );
};

export default Card;
