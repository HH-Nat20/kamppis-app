import React, { useRef, useLayoutEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

import Swiper from "react-native-deck-swiper";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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

import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams, useNavigation } from "expo-router";

import Toast from "react-native-toast-message";

import { useSwipeMutation } from "@/api/queries/swipeMutations";
import { useUser } from "@/contexts/UserContext";

const width = Dimensions.get("window").width;

export default function DetailsScreen() {
  const navigation = useNavigation();

  const queryClient = useQueryClient();

  const { profileId, roomId } = useLocalSearchParams();
  const { user } = useUser();

  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const { data: profile, isPending } = useQuery(
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

  const swipeMutation = useSwipeMutation();

  const handleSendLike = async () => {
    if (!user || !profile) return;

    const swipeRequest = {
      swipingProfileId: roomId ? Number(roomId) : user.userProfile.id,
      swipedProfileId: profile.id,
      isRightSwipe: true,
    };

    try {
      const swipeResponse = await swipeMutation.mutateAsync(swipeRequest);

      console.log("Swipe response:", swipeResponse);
      if ("status" in swipeResponse && swipeResponse.status !== 200) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2:
            "Failed to send like. You may have already liked this profile.",
        });
        return;
      }

      if (swipeResponse.isMatch) {
        Toast.show({
          type: "success",
          text1: "New Match!",
          text2: "It's a match! 🎉",
        });
        queryClient.invalidateQueries({
          queryKey: ["matches", user.userProfile.id],
        });
      } else {
        Toast.show({
          type: "info",
          text1: "Like sent",
          text2: "We'll notify you if it's a match!",
        });
      }
    } catch (error) {
      console.error("Like failed:", error);
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        text2: "Please try again later.",
      });
    }
  };

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

  if (isPending) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Profile not found.</Text>
      </View>
    );
  }

  return (
    <Container>
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

        <View className="items-center">
          <TouchableOpacity
            className="bg-pink-500 rounded-full p-4"
            onPress={handleSendLike}
          >
            <Ionicons name="heart" size={32} color="white" />
          </TouchableOpacity>
          <Text className="mt-2 text-pink-500 font-semibold">Send Like</Text>
        </View>

        {/* General Info */}
        {profile && "user" in profile ? (
          <UserProfileDetailsCard profile={profile} />
        ) : (
          <RoomProfileDetailsCard profile={profile!} />
        )}
      </View>
      <StatusBar barStyle="light-content" />
    </Container>
  );
}
