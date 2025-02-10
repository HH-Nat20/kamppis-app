import React, { useState } from "react";

import { View, Text, Image, Pressable } from "react-native";

import styles from "../ui/styles";

import { User } from "../types/user";

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
      <View style={styles.card} key={card.id}>
        <Image source={{ uri: card.picture }} style={styles.cardPicture} />

        <Text style={styles.cardTitle}>
          {card.firstName}, {card.age}
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
                <Text style={styles.definitionValue}>{card.email}</Text>
              </View>
              <View style={styles.definition}>
                <Text style={styles.definitionText}>Date of Birth: </Text>
                <Text style={styles.definitionValue}>
                  {card.dateOfBirth[0].toString()}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default Card;
