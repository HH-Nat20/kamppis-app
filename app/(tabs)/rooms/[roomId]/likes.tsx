import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";

import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import { getProfilePicture, getImageUrl } from "@/helpers/helpers";
import { Heading } from "@/components/ui/heading";

import styles from "@/assets/styles/styles";
import { bgGradient } from "@/assets/styles/colors";

import { UserProfile } from "@/types/responses/UserProfile";
import dao from "@/api/dao";
import { router, useLocalSearchParams, Link } from "expo-router";

import { SwiperResponse } from "@/types/responses/Swiper";

const PAGE_SIZE: number = 5;

const Likes = () => {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const numericId: number = Number(roomId);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<
    SwiperResponse,
    Error,
    { pages: SwiperResponse[] },
    [string, number],
    number
  >({
    queryKey: ["roomProfileSwipers", numericId],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) =>
      await dao.getRoomProfileSwipers(numericId, pageParam, PAGE_SIZE),
    getNextPageParam: (lastPage, pages) =>
      lastPage.last ? undefined : pages.length,
    enabled: !!numericId,
  });

  const handleViewProfile = (profileId: number) => {
    console.log("Viewing profile:", profileId);
    router.push({
      pathname: "/[profileId]",
      params: { profileId },
    });
  };

  const flatData = data?.pages.flatMap((page) => page.swipers) ?? [];

  const renderItem = ({ item }: { item: UserProfile }) => {
    const photo = getProfilePicture(item.photos);

    return (
      <TouchableOpacity
        style={styles.matchItem}
        onPress={() => handleViewProfile(item.id)}
      >
        {photo ? (
          <Image
            source={{ uri: getImageUrl(photo, "thumbnail", item.id) }}
            style={styles.image}
          />
        ) : (
          <View style={[styles.image, styles.placeholder]}>
            <Text style={styles.placeholderText}>No Photo</Text>
          </View>
        )}
        <View style={styles.overlay}>
          <Text style={styles.name}>{item.user.firstName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-800">
      <LinearGradient colors={bgGradient} style={styles.background} />

      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : isError ? (
        <View style={styles.emptyContainer}>
          <Heading>
            No likes yet.{" "}
            <Link className="text-info-500" href={{ pathname: "/swiper" }}>
              Swipe on users
            </Link>{" "}
            to get more visibility!
          </Heading>
        </View>
      ) : flatData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Heading>
            No likes yet.{" "}
            <Link className="text-info-500" href={{ pathname: "/swiper" }}>
              Swipe on users
            </Link>{" "}
            to get more visibility!
          </Heading>
        </View>
      ) : (
        <FlatList
          data={flatData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : null
          }
        />
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Likes;
