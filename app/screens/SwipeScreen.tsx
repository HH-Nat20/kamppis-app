import React, { useRef } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import Swiper from "react-native-deck-swiper";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";

import { useUser } from "../contexts/UserContext";
import { useMatch } from "../contexts/MatchContext";
import { useMatchableProfiles } from "../contexts/MatchableProfilesContext";
import { useSwipeMutation } from "../queries/swipeMutations";

import { SwipeRequest } from "../types/requests/SwipeRequest";
import { ProfileCard } from "../types/ProfileCard";
import Card from "../components/Card";
import styles from "../ui/styles";

const SwipeScreen: React.FC = () => {
  const swiperRef = useRef<Swiper<any>>(null);

  const { user } = useUser();
  const { refreshMatches } = useMatch();
  const { cards, loading, refreshMatchableProfiles } = useMatchableProfiles();

  const swipeMutation = useSwipeMutation();

  const handleSwipe = async (
    cardIndex: number,
    direction: "left" | "right" | "down"
  ) => {
    const card = cards[cardIndex];
    if (!card || !user) return;

    const swipeRequest: SwipeRequest = {
      swipingProfileId: user.userProfile.id,
      swipedProfileId: card.profile.id,
      isRightSwipe: direction === "right",
    };

    try {
      const swipeResponse = await swipeMutation.mutateAsync(swipeRequest);

      if (swipeResponse.isMatch) {
        Toast.show({
          type: "success",
          text1: "New Match!",
          text2: "It's a match! 🎉",
        });
        refreshMatches();
      }
    } catch (error) {
      console.error("Swipe failed:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (cards.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.cardTitle}>No Profiles Found</Text>
        <Text style={styles.subtitle}>
          Try adjusting your settings for better results
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        cards={cards}
        renderCard={(card) => <Card card={card as ProfileCard} />}
        onSwipedLeft={(i) => handleSwipe(i, "left")}
        onSwipedRight={(i) => handleSwipe(i, "right")}
        onSwipedBottom={(i) => handleSwipe(i, "down")}
        onSwipedAll={() => {
          setTimeout(refreshMatchableProfiles, 500);
        }}
        cardIndex={0}
        backgroundColor="transparent"
        stackScale={-3}
        stackSize={10}
        animateOverlayLabelsOpacity
        animateCardOpacity
        infinite={false}
        overlayLabels={{
          bottom: {
            element: <Ionicons name="help-outline" size={250} color="blue" />,
            title: "BLEAH",
            style: overlayStyle,
          },
          left: {
            element: <Ionicons name="thumbs-down" size={250} color="red" />,
            title: "NOPE",
            style: overlayStyle,
          },
          right: {
            element: <Ionicons name="thumbs-up" size={250} color="green" />,
            title: "LIKE",
            style: overlayStyle,
          },
          top: {
            element: <Ionicons name="heart" size={250} color="red" />,
            title: "SUPER LIKE",
            style: overlayStyle,
          },
        }}
      />
    </View>
  );
};

const overlayStyle = {
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
};

export default SwipeScreen;
