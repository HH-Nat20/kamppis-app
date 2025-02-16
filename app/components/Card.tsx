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

interface CardProps {
  card: User;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const [tapped, setTapped] = useState<boolean>(false);

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
              {card.firstName} {card.lastName}, {countAge(card.dateOfBirth)}
            </Text>

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
                    <Text style={styles.definitionText}>Email: </Text>
                    <Text style={styles.definitionValue}>
                      {card.user?.email}
                    </Text>
                  </View>
                  <View style={styles.definition}>
                    <Text style={styles.definitionText}>Date of Birth: </Text>
                    <Text style={styles.definitionValue}>
                      {formatDate(card.dateOfBirth)}
                    </Text>
                  </View>
                  <View style={styles.definition}>
                    <Text style={styles.definitionText}>Gender: </Text>
                    <Text style={styles.definitionValue}>{card.gender}</Text>
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
