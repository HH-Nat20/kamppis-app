import React, { useEffect, useState } from "react";
import { Text, View, Alert, Image } from "react-native";
import Swiper from "react-native-deck-swiper";

import styles from "../ui/styles";
import { User } from "../types/user";

const SwipeScreen = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<User[]>([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: [1990, 5, 14],
      email: "john.doe@example.com",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      dateOfBirth: [1995, 8, 23],
      email: "jane.smith@example.com",
    },
  ]);

  const getCards = async () => {
    // Fetch users
    let fetchedCards: User[] = [];

    while (fetchedCards.length < 10) {
      console.log("Fetching user...");
      await fetch("https://randomuser.me/api/")
        .then((response) => response.json())
        .then((data) => {
          const user = data.results[0];
          const newUser: User = {
            id: fetchedCards.length + 1,
            firstName: user.name.first,
            lastName: user.name.last,
            dateOfBirth: [user.dob.date],
            email: user.email,
            picture: user.picture.large,
          };
          console.log(`Fetched user: ${newUser.firstName} ${newUser.lastName}`);
          fetchedCards.push(newUser);
        });
    }

    setCards(fetchedCards);
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <View style={styles.container}>
      <Swiper
        cards={cards}
        renderCard={(card: any) => {
          return (
            <View style={styles.card}>
              <Image
                source={{ uri: card.picture }}
                style={{ width: 300, height: 300 }}
              />
              <Text style={styles.text}>{card.firstName}</Text>
            </View>
          );
        }}
        onSwipedLeft={(cardIndex: any) => {
          console.log(
            `${cards[cardIndex].firstName} ${cards[cardIndex].lastName} was swiped left`
          );
        }}
        onSwipedRight={(cardIndex: any) => {
          console.log(
            `${cards[cardIndex].firstName} ${cards[cardIndex].lastName} was swiped right`
          );
        }}
        onSwipedAll={() => {
          console.log("everything swiped");
          Alert.alert("All cards have been swiped");
        }}
        cardIndex={0}
        backgroundColor={"#010101"}
        stackSize={3}
        stackSeparation={15}
        animateOverlayLabelsOpacity
        animateCardOpacity
        swipeBackCard
      />
    </View>
  );
};

export default SwipeScreen;
