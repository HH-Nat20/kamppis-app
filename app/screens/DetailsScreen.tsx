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
import Entypo from "@expo/vector-icons/Entypo";

import Swiper from "react-native-deck-swiper";

import styles from "../ui/styles";
import colors, { renderTagBgColor } from "../ui/colors";

import dao from "../ajax/dao";

import { User } from "../types/User";
import { LifestyleDescriptions } from "../types/enums/LifestyleEnum";
import { CleanlinessDescriptions } from "../types/enums/CLeanlinessEnum";

import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DetailsParamList } from "../navigation/SwipeStackNavigator";
import { Photo } from "../types/Photo";

type DetailsScreenRouteProp = RouteProp<DetailsParamList, "DetailsScreen">;
type NavigationProp = StackNavigationProp<DetailsParamList, "DetailsScreen">;

type DetailsScreenProps = {
  route: DetailsScreenRouteProp;
};

export default function DetailsScreen({ route }: DetailsScreenProps) {
  const swiperRef = useRef<Swiper<any>>(null);
  const { userId } = route.params;

  const [user, setUser] = useState<User | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tooltip, setTooltip] = useState<string | null>(null);

  useEffect(() => {
    dao.getUserProfile(userId).then((user) => {
      console.log("Here are some photos", user.userPhotos);
      setUser(user);
      setPhotos(user.userPhotos || []);
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
          <Swiper
            ref={swiperRef}
            cards={photos}
            renderCard={(photo: Photo, index: number) => (
              <View key={photo?.id || index} style={styles.portraitContainer}>
                <Image source={{ uri: photo?.name }} style={styles.portrait} />
              </View>
            )}
            cardIndex={0}
            backgroundColor={colors.background}
            stackSize={1}
            stackSeparation={15}
            stackScale={5}
            infinite={true}
            animateOverlayLabelsOpacity
            animateCardOpacity
            verticalSwipe={false}
            horizontalSwipe={true}
          />
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.tagArea}>
            {user?.cleanliness && (
              <Pressable onPress={() => toggleTooltip(user.cleanliness)}>
                <Text style={styles.cleanlinessTag}>
                  {user.cleanliness.replaceAll("_", " ")}
                </Text>
                {tooltip === user.cleanliness && (
                  <View style={styles.tooltip}>
                    <Text style={styles.tooltipText}>
                      {CleanlinessDescriptions[user.cleanliness]}
                    </Text>
                  </View>
                )}
              </Pressable>
            )}

            {user?.lifestyle &&
              user.lifestyle.map((tag, index) => (
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

          <Text style={styles.bioText}>{user?.bio}</Text>

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
              <Text style={styles.definitionValue}>{user?.maxRent}</Text>
            </View>
          </View>

          <Text style={styles.subtitle}>Locations:</Text>

          <View style={styles.tagArea}>
            {user?.preferredLocations &&
              user.preferredLocations.map((tag, index) => (
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
