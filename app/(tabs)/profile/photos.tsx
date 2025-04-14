import React, { useState, useEffect } from "react";
import { Alert, ScrollView, Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

import { useUser } from "@/contexts/UserContext";

import { Photo } from "@/types/responses/Photo";

import { Fab, FabLabel, FabIcon } from "@/components/ui/fab";
import { AddIcon } from "@/components/ui/icon";

import ProfileDrawerLayout from "@/components/custom/ProfileDrawerLayout";

import { router } from "expo-router";

import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
} from "@/components/ui/actionsheet";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Switch } from "@/components/ui/switch";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Plus, Trash2 } from "lucide-react-native";

import dao from "@/api/dao";
import Portrait from "@/components/common/Portrait";

const width = Dimensions.get("window").width;

export default function ProfilePhotosScreen() {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(false);
  const { user, refreshUser } = useUser();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

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

  useEffect(() => {
    if (user) {
      setPhotos(user.userProfile.photos || []);
    }
  }, [user]);

  const handleDeletePress = (photo: Photo) => {
    if (photo.isProfilePhoto) {
      Alert.alert(
        "Cannot Delete Profile Photo",
        "Please change your profile photo before deleting this one."
      );
      return;
    }

    Alert.alert("Delete Photo", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => confirmDelete(photo) },
    ]);
  };

  const confirmDelete = (photo: Photo) => {
    dao.deleteImage(user?.userProfile?.id, photo).then(() => {
      Alert.alert("Photo Deleted", "Your photo has been deleted.");
      setPhotos(photos.filter((p) => p.id !== photo.id));
    });
  };

  const changeProfilePhoto = (photo: Photo, value: boolean) => {
    dao.putImage(user?.userProfile?.id, photo, value).then(() => {
      const updated = photos.map((p) => ({
        ...p,
        isProfilePhoto: p.id === photo.id ? value : false,
      }));
      setPhotos(updated);
      refreshUser();
    });
  };

  const openUploader = (mode: string) => {
    const profileId = user?.userProfile?.id;
    setShowActionsheet(false);
    router.push({
      pathname: "/profile/upload",
      params: { mode, profileId },
    });
  };

  return (
    <ProfileDrawerLayout>
      <VStack className="px-5 py-4 flex-1 bg-white dark:bg-black" space="xl">
        <Heading className="mb-2">Your Photos</Heading>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <VStack space="xl">
            <Box className="p-4 rounded-xl border border-border bg-info-900 dark:bg-info-100">
              <Carousel
                width={width * 0.85}
                height={width}
                ref={ref}
                data={photos}
                onProgressChange={progress}
                renderItem={({ item: photo }: { item: Photo }) => (
                  <>
                    <Portrait photo={photo} />
                    <HStack className="justify-between items-center mt-4">
                      <HStack space="md" className="items-center">
                        <Switch
                          value={photo.isProfilePhoto}
                          onValueChange={(value) =>
                            changeProfilePhoto(photo, value)
                          }
                        />
                        <Text className="text-white">Profile Photo</Text>
                      </HStack>
                      <Pressable onPress={() => handleDeletePress(photo)}>
                        <Icon className="text-white" as={Trash2} />
                      </Pressable>
                    </HStack>
                  </>
                )}
              />
            </Box>
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
          </VStack>
        </ScrollView>
        <Fab
          className="absolute bottom-5 right-5 bg-success-500"
          onPress={() => setShowActionsheet(true)}
          size="md"
          isHovered={false}
          isDisabled={false}
          isPressed={false}
        >
          <FabIcon className="text-white" as={AddIcon} />
          <FabLabel className="text-white">Add Image</FabLabel>
        </Fab>

        <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
          <ActionsheetBackdrop />
          <ActionsheetContent>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <ActionsheetItem onPress={() => openUploader("gallery")}>
              <ActionsheetItemText>Upload from gallery</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem onPress={() => openUploader("camera")}>
              <ActionsheetItemText>Use Camera</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem onPress={handleClose}>
              <ActionsheetItemText>Cancel</ActionsheetItemText>
            </ActionsheetItem>
          </ActionsheetContent>
        </Actionsheet>
      </VStack>
    </ProfileDrawerLayout>
  );
}
