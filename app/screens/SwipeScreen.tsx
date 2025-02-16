import React, { useEffect, useState, useRef } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import Swiper from "react-native-deck-swiper";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../ui/styles";
import { User } from "../types/user";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMatch } from "../contexts/MatchContext";

import dao from "../ajax/dao";

import Card from "../components/Card";

const SwipeScreen: React.FC = () => {
  const swiperRef = useRef<Swiper<any>>(null);

  const { addMatch } = useMatch();
  const [loading, setLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<User[]>([]);

  const fetchInitialCards = async () => {
    // Temporary randomizer
    const randInt = Math.floor(Math.random() * 5) + 1;

    setLoading(true);

    try {
      const users: User[] = await dao.getPossibleMatches(randInt);

      setLoading(false);

      if (!Array.isArray(users) || users.length === 0) {
        console.warn("No users received from API");
        setLoading(false);
        return;
      }

      setCards(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchInitialCards();
  }, []);

  const onSwipeLeft = (cardIndex: number) => {
    const card = cards[cardIndex];
    if (!card) return;
    console.log(`${card.firstName} ${card.lastName} was swiped left`);
  };

  const onSwipeRight = (cardIndex: number) => {
    const card = cards[cardIndex];
    if (!card) return;
    console.log(`${card.firstName} ${card.lastName} was swiped right`);
    if (Math.random() < 0.25) {
      addMatch(card);
      console.log(`Matched with ${card.firstName} ${card.lastName}`);
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
          renderCard={(card: User | {}) =>
            Object.keys(card).length ? (
              <Card card={card as User} key={(card as User).id} />
            ) : (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>No Matches Found</Text>
                <Text style={styles.subtitle}>
                  Try adjusting your settings for better results
                </Text>
              </View>
            )
          }
          onSwipedLeft={onSwipeLeft}
          disableBottomSwipe={false}
          disableTopSwipe={true} // for now
          onSwipedRight={onSwipeRight}
          onSwipedAll={() => {
            setCards([]);
            fetchInitialCards();
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
