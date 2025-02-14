import React, { useState } from "react";

import { View, Text, Image, Pressable } from "react-native";

import styles from "../ui/styles";

import { User } from "../types/user";

import { countAge, formatDate, getProfilePicture } from "../helpers/helpers";

interface CardProps {
  card: User;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const [tapped, setTapped] = useState<boolean>(false);

  return (
    <Pressable
      onPress={() => {
        setTapped(!tapped);
      }}
      style={styles.title}
    >
      <View style={styles.card} key={card.user?.id}>
        <Image
          source={{
            uri: getProfilePicture(card.userPhotos),
          }}
          style={styles.cardPicture}
        />

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
                <Text style={styles.definitionValue}>{card.user?.email}</Text>
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
    </Pressable>
  );
};

export default Card;
