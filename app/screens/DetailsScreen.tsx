import React, { useRef } from "react";
import {
  StatusBar,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import Swiper from "react-native-deck-swiper";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import styles from "../ui/styles";
import colors from "../ui/colors";

import Portrait from "../components/Portrait";
import TagArea from "../components/TagArea";
import { Heading } from "@/components/ui/heading";
import { Center } from "@/components/ui/center";

import { UserProfileDetailsCard } from "../components/UserProfileDetailsCard";
import { RoomProfileDetailsCard } from "../components/RoomProfileDetailsCard";

import { DetailsParamList } from "../navigation/SwipeStackNavigator";
import { getProfileQueryOptions } from "../queries/profileQueries";
import { RouteProp } from "@react-navigation/native";

import Container from "../components/Container";

type DetailsScreenRouteProp = RouteProp<DetailsParamList, "DetailsScreen">;

export default function DetailsScreen() {
  const route = useRoute<DetailsScreenRouteProp>();
  const { profileId } = route.params;
  const swiperRef = useRef<Swiper<any>>(null);

  const { data: profile, isLoading } = useQuery(
    getProfileQueryOptions(Number(profileId))
  );

  const photos = profile?.photos || [];

  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.white} />
      ) : (
        <>
          <View style={styles.portraitSwiper}>
            {photos.length > 0 ? (
              <Swiper
                ref={swiperRef}
                cards={photos}
                renderCard={(photo, i) => (
                  <Portrait key={photo.id || i} photo={photo} />
                )}
                cardIndex={0}
                backgroundColor={colors.background}
                stackSize={Math.min(photos.length, 3)}
                stackSeparation={0}
                stackScale={0}
                infinite
                animateOverlayLabelsOpacity
                animateCardOpacity
                verticalSwipe={false}
                horizontalSwipe
              />
            ) : (
              <Center style={styles.portraitSwiper}>
                <Heading style={styles.text}>No photos available</Heading>
              </Center>
            )}
          </View>

          <View style={styles.profileInfo}>
            {/* Tags */}
            <View
              style={[
                styles.tagArea,
                { flexDirection: "row", flexWrap: "wrap", gap: 8 },
              ]}
            >
              {"cleanliness" in profile! && profile!.cleanliness && (
                <Text
                  style={{
                    ...styles.cleanlinessTag,
                    height: 30,
                    padding: 5,
                    marginTop: 15,
                  }}
                >
                  {profile!.cleanliness.replaceAll("_", " ")}
                </Text>
              )}

              {/* Location */}
              {"location" in profile! && (
                <Text
                  style={{
                    ...styles.tag,
                    height: 35,
                    padding: 7,
                    marginTop: 15,
                  }}
                >
                  {profile.location.replaceAll("_", " ")}
                </Text>
              )}

              <TagArea profile={profile!} />
            </View>

            {/* General Info */}
            {profile && "user" in profile ? (
              <UserProfileDetailsCard profile={profile} />
            ) : (
              <RoomProfileDetailsCard profile={profile!} />
            )}
          </View>
        </>
      )}
      <StatusBar barStyle="light-content" />
    </Container>
  );
}
