import React, { useRef, useLayoutEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  BackHandler,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

import Swiper from "react-native-deck-swiper";
import { useQuery } from "@tanstack/react-query";

import styles from "@/assets/styles/styles";
import colors from "@/assets/styles/colors";

import Portrait from "@/components/common/Portrait";
import TagArea from "@/components/common/TagArea";
import { Heading } from "@/components/ui/heading";
import { Center } from "@/components/ui/center";

import { UserProfileDetailsCard } from "@/components/custom/UserProfileDetailsCard";
import { RoomProfileDetailsCard } from "@/components/custom/RoomProfileDetailsCard";

import { getProfileQueryOptions } from "@/api/queries/profileQueries";

import Container from "@/components/common/Container";

import { Photo } from "@/types/responses/Photo";

import { useLocalSearchParams, useNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const width = Dimensions.get("window").width;

export default function DetailsScreen() {
  const navigation = useNavigation();

  const { profileId } = useLocalSearchParams();

  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const { data: profile, isLoading } = useQuery(
    getProfileQueryOptions(Number(profileId))
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: colors.black,
            }}
          >
            {profile && "user" in profile && String(profile.user.firstName)}
            {profile && "flat" in profile && String(profile.flat.name)}
          </Text>
        );
      },
    });
  }, [navigation, profile]);

  const photos = profile?.photos || [];

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <Container>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.white} />
      ) : (
        <>
          <View style={styles.portraitSwiper}>
            {photos?.length > 0 ? (
              <Carousel
                width={width}
                height={width}
                ref={ref}
                data={photos}
                onProgressChange={progress}
                renderItem={({ item: photo }: { item: Photo }) => (
                  <Portrait key={photo.id} photo={photo} />
                )}
              />
            ) : (
              <Center style={styles.portraitSwiper}>
                <Heading size="lg">No photos yet</Heading>
              </Center>
            )}
            <Pagination.Basic
              progress={progress}
              data={photos}
              dotStyle={{
                backgroundColor: "rgba(0,0,0,0.2)",
                borderRadius: 50,
              }}
              containerStyle={{ gap: 5, marginTop: 10 }}
              onPress={onPressPagination}
            />
          </View>

          <View style={styles.profileInfo}>
            {/* Tags */}
            <View
              style={[
                styles.tagArea,
                { flexDirection: "row", flexWrap: "wrap", gap: 8 },
              ]}
            >
              {profile && "cleanliness" in profile! && profile!.cleanliness && (
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
              {profile && "location" in profile! && (
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
