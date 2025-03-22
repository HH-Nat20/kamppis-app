import React, { useEffect, useState, useRef } from "react";
import { Text, View, ActivityIndicator } from "react-native";

import Swiper from "react-native-deck-swiper";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

import Card from "../components/Card";

import dao from "../ajax/dao";

import { SwipeRequest, SwipeResponse } from "../types/requests/SwipeRequest";
import { ProfileCard } from "../types/ProfileCard";

import styles from "../ui/styles";
import { useUser } from "../contexts/UserContext";
import Toast from "react-native-toast-message";
import { useMatch } from "../contexts/MatchContext";
import { useMatchableProfiles } from "../contexts/MatchableProfilesContext";

const SwipeScreen: React.FC = () => {
  const swiperRef = useRef<Swiper<any>>(null);

  const { cards, loading, refreshMatchableProfiles } = useMatchableProfiles();
  const { user } = useUser();
  const { refreshMatches } = useMatch();

  const handleSwipe = async (
    cardIndex: number,
    direction: "left" | "right" | "down"
  ) => {
    if (!cards[cardIndex] || !user) return;
    console.log(`Swiped ${direction} on card ${cardIndex}`);
    const card = cards[cardIndex];

    const swipeRequest: SwipeRequest = {
      swipingUserId: user.id,
      swipedUserId: card.id,
      isRightSwipe: direction === "right",
    };

    try {
      const swipeResponse: SwipeResponse = await dao.swipe(swipeRequest);

      if (swipeResponse.isMatch) {
        Toast.show({
          type: "success",
          text1: "New Match!",
          text2: "It's a match! 🎉",
        });
        refreshMatches(); // Update matches after a successful match
      }
    } catch (error) {
      console.error("Error swiping:", error);
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
      ) : cards.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.cardTitle}>No Profiles Found</Text>
          <Text style={styles.subtitle}>
            Try adjusting your settings for better results
          </Text>
        </View>
      ) : (
        <Swiper
          ref={swiperRef}
          cards={cards}
          renderCard={(card: ProfileCard | {}) => (
            <Card card={card as ProfileCard} key={(card as ProfileCard).id} />
          )}
          onSwipedLeft={(cardIndex) => handleSwipe(cardIndex, "left")}
          disableBottomSwipe={false}
          disableTopSwipe={true} // for now
          onSwipedRight={(cardIndex) => handleSwipe(cardIndex, "right")}
          onSwipedBottom={(cardIndex) => handleSwipe(cardIndex, "down")}
          onSwipedAll={() => {
            setTimeout(refreshMatchableProfiles, 500); // Give time for state updates (hopefully fixes duplicate last card bug)
          }}
          onTapCard={(cardIndex) => {
            console.log(`tappity tap`);
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
