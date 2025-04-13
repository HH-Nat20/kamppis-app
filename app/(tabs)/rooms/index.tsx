import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { useNavigation, router } from "expo-router";

import { useRoomsDrawer } from "@/contexts/RoomsDrawerContext";
import { useUser } from "@/contexts/UserContext";
import RoomsDrawerLayout from "@/components/custom/RoomsDrawerLayout";

import Container from "@/components/common/Container";
import TagArea from "@/components/common/TagArea";

const RoomsScreen: React.FC = () => {
  const { isOpen, closeDrawer } = useRoomsDrawer();
  const { user } = useUser();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    console.log("RoomsScreen: useLayoutEffect", user?.roomProfiles);
    if (!user?.roomProfiles?.length) {
      navigation.setOptions({
        headerTitle: () => (
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>My Rooms</Text>
        ),
        headerRight: () => <></>,
      });
    }
  }, [user]);

  return (
    <RoomsDrawerLayout>
      <Container>
        {user?.roomProfiles?.length ? (
          <View className="flex-1 justify-center items-center p-4 mt-4">
            <Heading>Your flat:</Heading>
            <Text>{user.roomProfiles[0]?.flat?.name}</Text>
            <Text className="text-gray-500">
              {user.roomProfiles[0]?.flat?.location}
            </Text>
            <Heading>Your rooms:</Heading>
            <Card className="w-1/2 px-4 py-2 bg-white dark:bg-black">
              {user.roomProfiles.map((room, index) => (
                <Button
                  className="mb-2 w-full bg-info-600"
                  key={room.id}
                  onPress={() => {
                    closeDrawer();
                  }}
                >
                  <Text className="text-white dark:text-white">
                    {room.name ?? "Room " + (index + 1)}
                  </Text>
                </Button>
              ))}
            </Card>
          </View>
        ) : (
          <View className="flex-1 justify-center items-center p-4 mt-4">
            <Heading>Looking for roommates for a free room?</Heading>
            <Card className="w-1/2 px-4 py-2 bg-white dark:bg-black">
              <Button
                className="mb-2 bg-success-600"
                onPress={() => {
                  router.push("/flatModal");
                }}
              >
                <Text className="text-white dark:text-white">
                  Create a Flat
                </Text>
              </Button>
              <Button className="mb-2 bg-info-600">
                <Text className="text-white dark:text-white">Join Flat</Text>
              </Button>
            </Card>
          </View>
        )}
      </Container>
    </RoomsDrawerLayout>
  );
};

export default RoomsScreen;
