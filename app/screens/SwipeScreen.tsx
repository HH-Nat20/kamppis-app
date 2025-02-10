import React, { useEffect, useState } from "react";
import { Text, View, Alert, Image, ActivityIndicator } from "react-native";
import Swiper from "react-native-deck-swiper";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../ui/styles";
import { User } from "../types/user";

interface SwipeScreenProps {
  setMatches: React.Dispatch<React.SetStateAction<User[]>>;
  matches: User[];
}

const SwipeScreen: React.FC<SwipeScreenProps> = ({ setMatches, matches }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<User[]>([]);

  const fetchUser = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      const user = data.results[0];
      return {
        id: user.login.uuid, // Ensuring unique keys
        firstName: user.name.first,
        lastName: user.name.last,
        dateOfBirth: [user.dob.date],
        email: user.email,
        picture: user.picture.large,
      };
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  const fetchInitialCards = async () => {
    setLoading(true);
    const fetchedCards: User[] = [];
    while (fetchedCards.length < 10) {
      const newUser = await fetchUser();
      if (newUser) fetchedCards.push(newUser);
    }
    setCards(fetchedCards);
    setLoading(false);
  };

  useEffect(() => {
    fetchInitialCards();
  }, []);

  const onSwipeRight = (cardIndex: number) => {
    const matchedUser = cards[cardIndex];
    console.log(
      `${matchedUser.firstName} ${matchedUser.lastName} was swiped right`
    );
    if (Math.random() < 0.25) {
      setMatches((prevMatches) => [...prevMatches, matchedUser]);
      console.log(
        `Matched with ${matchedUser.firstName} ${matchedUser.lastName}`
      );
    }
    setCards((prevCards) =>
      prevCards.filter((_, index) => index !== cardIndex)
    );
    addNewCard();
  };

  const addNewCard = async () => {
    const newUser = await fetchUser();
    if (newUser) setCards((prevCards) => [newUser, ...prevCards]);
  };

  return (
    <LinearGradient
      colors={["#912ED3", "#671C97", "41105F", "2F0945"]}
      style={styles.container}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Swiper
          cards={cards}
          renderCard={(card: User | null) =>
            card ? (
              <View style={styles.card} key={card.id}>
                <Image
                  source={{ uri: card.picture }}
                  style={styles.cardPicture}
                />
                <Text style={styles.title}>{card.firstName}</Text>
              </View>
            ) : null
          }
          onSwipedLeft={(cardIndex) => {
            console.log(
              `${cards[cardIndex].firstName} ${cards[cardIndex].lastName} was swiped left`
            );
            setCards((prevCards) =>
              prevCards.filter((_, index) => index !== cardIndex)
            );
            addNewCard();
          }}
          onSwipedRight={onSwipeRight}
          onSwipedAll={() => {
            console.log("Everything swiped");
            Alert.alert("All cards have been swiped", "Fetching new users...");
            fetchInitialCards();
          }}
          cardIndex={0}
          backgroundColor="transparent"
          stackSize={10}
          stackSeparation={15}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
          infinite={true}
        />
      )}
    </LinearGradient>
  );
};

export default SwipeScreen;
