import React, { useEffect, useState, useRef } from "react";
import { Text, View, ActivityIndicator } from "react-native";

import Swiper from "react-native-deck-swiper";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

import Card from "../components/Card";

import dao from "../ajax/dao";

import { User } from "../types/User";
import { SwipeRequest } from "../types/requests/SwipeRequest";

import styles from "../ui/styles";
import { MatchUser } from "../types/Match";
import { useUser } from "../contexts/UserContext";

const SwipeScreen: React.FC = () => {
  const swiperRef = useRef<Swiper<any>>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<User[]>([]);

  const { user } = useUser();

  const fetchInitialCards = async () => {
    setLoading(true);

    if (!user?.id) {
      console.warn("No logged-in user found");
      setLoading(false);
      return;
    }

    try {
      let users: User[] = await dao.getPossibleMatches(user.id);

      users = users.filter((u) => u.id !== user.id);
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
  }, [user]);

  const handleSwipe = (
    cardIndex: number,
    direction: "left" | "right" | "down"
  ) => {
    console.log(`Swiped ${direction} on card ${cardIndex}`);
    const card = cards[cardIndex];
    if (!card) return;
    if (!user) return;
    const swipeRequest: SwipeRequest = {
      swipingUserId: user.id,
      swipedUserId: card.id,
      isRightSwipe: direction === "right",
    };
    dao.swipe(swipeRequest);
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
              <View>
                {/* TODO: Remove everything except Card when no longer testing with hardcoded users */}
                <View
                  style={{ position: "absolute", top: 20, left: 20, zIndex: 2 }}
                >
                  <Text style={{ color: "#FFF", fontSize: 20 }}>
                    Swiping as: {user?.email}
                  </Text>
                </View>
                <Card card={card as User} key={(card as User).id} />
              </View>
            ) : (
              <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>No Matches Found</Text>
                <Text style={styles.subtitle}>
                  Try adjusting your settings for better results
                </Text>
              </View>
            )
          }
          onSwipedLeft={(cardIndex) => handleSwipe(cardIndex, "left")}
          disableBottomSwipe={false}
          disableTopSwipe={true} // for now
          onSwipedRight={(cardIndex) => handleSwipe(cardIndex, "right")}
          onSwipedBottom={(cardIndex) => handleSwipe(cardIndex, "down")}
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
          stackScale={-3}
          stackSize={10}
          animateOverlayLabelsOpacity
          animateCardOpacity
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
