import React, { useEffect, useState, useRef } from "react";
import { View, Alert, ActivityIndicator } from "react-native";
import Swiper from "react-native-deck-swiper";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../ui/styles";
import { User } from "../types/user";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMatch } from "../contexts/MatchContext";

import Card from "../components/Card";

const SwipeScreen: React.FC = () => {
  const swiperRef = useRef<Swiper<any>>(null);

  const { addMatch } = useMatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<User[]>([]);

  const fetchUser = async () => {
    try {
      const randNum = Math.floor(Math.random() * 500) + 1;
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + randNum
      );
      const data = await response.json();
      return {
        id: randNum, // Ensuring unique keys
        firstName: data.name,
        lastName: "",
        dateOfBirth: [new Date().getFullYear(), 1, 1],
        age: Math.floor(Math.random() * 100),
        email: "pokemons.dont.have@emails.com",
        picture: data.sprites.front_default,
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

  const onSwipeLeft = (cardIndex: number) => {
    console.log(
      `${cards[cardIndex].firstName} ${cards[cardIndex].lastName} was swiped left`
    );
  };

  const onSwipeRight = (cardIndex: number) => {
    const matchedUser = cards[cardIndex];
    console.log(
      `${matchedUser.firstName} ${matchedUser.lastName} was swiped right`
    );
    if (Math.random() < 0.25) {
      addMatch(matchedUser);
      console.log(
        `Matched with ${matchedUser.firstName} ${matchedUser.lastName}`
      );
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(145, 46, 211, 1)",
          "rgba(103, 28, 151, 1)",
          "rgba(65, 16, 95, 1)",
          "rgba(47, 9, 69, 1)",
        ]}
        style={styles.background}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Swiper
          ref={swiperRef}
          cards={cards}
          renderCard={(card: User | null) =>
            card ? <Card card={card} key={card.id} /> : null
          }
          onSwipedLeft={onSwipeLeft}
          disableBottomSwipe={false}
          disableTopSwipe={true} // for now
          onSwipedRight={onSwipeRight}
          onSwipedAll={() => {
            console.log("Everything swiped");
            Alert.alert("All cards have been swiped", "Fetching new users...");
            setCards([]);
            fetchInitialCards(); // Fetch new users without full re-render
          }}
          onTapCard={(cardIndex) => {
            console.log(
              `${cards[cardIndex].firstName} ${cards[cardIndex].lastName} was tapped`
            );
          }}
          cardIndex={0}
          backgroundColor="transparent"
          stackSize={10}
          stackSeparation={15}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
          infinite={false} // change?
          overlayLabels={{
            bottom: {
              element: <Ionicons name="help-outline" size={100} color="blue" />,
              title: "BLEAH",
              style: {
                label: {
                  backgroundColor: "black",
                  borderColor: "black",
                  color: "white",
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                },
              },
            },
            left: {
              element: <Ionicons name="thumbs-down" size={100} color="red" />,
              title: "NOPE",
              style: {
                label: {
                  backgroundColor: "black",
                  borderColor: "black",
                  color: "red",
                  borderWidth: 1,
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              element: <Ionicons name="thumbs-up" size={100} color="green" />,
              title: "LIKE",
              style: {
                label: {
                  backgroundColor: "black",
                  borderColor: "black",
                  color: "green",
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
            top: {
              element: <Ionicons name="heart" size={100} color="red" />,
              title: "SUPER LIKE",
              style: {
                label: {
                  backgroundColor: "black",
                  borderColor: "black",
                  color: "white",
                  borderWidth: 1,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                },
              },
            },
          }}
        />
      )}
    </View>
  );
};

export default SwipeScreen;
