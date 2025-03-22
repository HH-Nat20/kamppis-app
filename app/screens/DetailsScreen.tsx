import React, { useState, useEffect, useRef } from "react";
import {
  StatusBar,
  Text,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import Swiper from "react-native-deck-swiper";

import styles from "../ui/styles";
import colors, { renderTagBgColor } from "../ui/colors";

import dao from "../ajax/dao";

import { User } from "../types/responses/User";
import { ProfileCard } from "../types/ProfileCard";
import { LifestyleDescriptions } from "../types/enums/LifestyleEnum";
import { CleanlinessDescriptions } from "../types/enums/CLeanlinessEnum";

import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DetailsParamList } from "../navigation/SwipeStackNavigator";
import { Photo } from "../types/responses/Photo";

import Portrait from "../components/Portrait";
import { RoomProfile } from "../types/responses/RoomProfile";
import { UserProfile } from "../types/responses/UserProfile";

type DetailsScreenRouteProp = RouteProp<DetailsParamList, "DetailsScreen">;
type NavigationProp = StackNavigationProp<DetailsParamList, "DetailsScreen">;

type DetailsScreenProps = {
  route: DetailsScreenRouteProp;
};

export default function DetailsScreen({ route }: DetailsScreenProps) {
  const swiperRef = useRef<Swiper<any>>(null);
  const { userId, profileId } = route.params;

  const [user, setUser] = useState<User | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [profile, setProfile] = useState<UserProfile | RoomProfile | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [tooltip, setTooltip] = useState<string | null>(null);

  const [preferredLocations, setPreferredLocations] = useState<string[]>([]);

  useEffect(() => {
    dao.getProfile(userId).then((user) => {
      setUser(user);
      const correctProfile =
        user.userProfile?.id === profileId
          ? user.userProfile
          : user.roomProfiles.filter((p) => p.id === profileId)[0];
      setProfile(correctProfile);
      setPhotos(correctProfile.photos || []);
      setPreferredLocations(["Helsinki", "Espoo", "Vantaa"]);
      setLoading(false);
    });
  }, [userId]);

  const toggleTooltip = (tag: string) => {
    setTooltip(tooltip === tag ? null : tag);
  };

  return (
    <TouchableWithoutFeedback onPress={() => setTooltip(null)}>
      <ScrollView style={styles.scrollContainer}>
        {loading && <ActivityIndicator size="large" color={colors.white} />}

        <View style={styles.portraitSwiper}>
          {photos.length > 0 ? (
            <Swiper
              ref={swiperRef}
              cards={photos}
              renderCard={(photo: Photo, index: number) => (
                <Portrait key={photo?.id || `photo-${index}`} photo={photo} />
              )}
              cardIndex={0}
              backgroundColor={colors.background}
              stackSize={Math.min(photos.length, 3)}
              stackSeparation={0}
              stackScale={0}
              infinite={true}
              animateOverlayLabelsOpacity
              animateCardOpacity
              verticalSwipe={false}
              horizontalSwipe={true}
            />
          ) : (
            <ActivityIndicator size="large" color={colors.white} />
          )}
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.tagArea}>
            {profile && "cleanliness" in profile && profile.cleanliness && (
              <Pressable onPress={() => toggleTooltip(profile.cleanliness)}>
                <Text style={styles.cleanlinessTag}>
                  {profile.cleanliness.replaceAll("_", " ")}
                </Text>
                {tooltip === profile.cleanliness && (
                  <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>
                      {CleanlinessDescriptions[profile.cleanliness]}
                    </Text>
                  </View>
                )}
              </Pressable>
            )}

            {profile &&
              "lifestyle" in profile &&
              profile.lifestyle &&
              profile.lifestyle.map((tag, index) => (
                <Pressable key={index} onPress={() => toggleTooltip(tag)}>
                  <Text
                    style={{
                      ...styles.tag,
                      backgroundColor: renderTagBgColor(tag),
                    }}
                  >
                    {tag.replaceAll("_", " ")}
                  </Text>
                  {tooltip === tag && (
                    <View style={styles.tooltip}>
                      <Text style={styles.tooltipText}>
                        {LifestyleDescriptions[tag]}
                      </Text>
                    </View>
                  )}
                </Pressable>
              ))}
          </View>

          <Text style={styles.bioText}>{profile?.bio}</Text>

          <View style={styles.definitionBox}>
            <View style={styles.definition}>
              <Text style={styles.definition}>Age</Text>
              <Text style={styles.definitionValue}>{user?.age}</Text>
            </View>
            <View style={styles.definition}>
              <Text style={styles.definition}>Gender</Text>
              <Text style={styles.definitionValue}>{user?.gender}</Text>
            </View>
            <View style={styles.definition}>
              <Text style={styles.definition}>Max Rent:</Text>
              <Text style={styles.definitionValue}>unavailable</Text>
            </View>
          </View>

          <Text style={styles.subtitle}>Locations:</Text>

          <View style={styles.tagArea}>
            {preferredLocations &&
              preferredLocations.map((tag, index) => (
                <Text key={index} style={styles.tag}>
                  {tag}
                </Text>
              ))}
          </View>
        </View>

        <StatusBar barStyle="light-content" />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
