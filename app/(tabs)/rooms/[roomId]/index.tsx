import React, { useLayoutEffect } from "react";

import { Text } from "react-native";

import { useLocalSearchParams, useNavigation } from "expo-router";

import { KeyboardAvoidingView, ScrollView } from "react-native";
import { useFormContext } from "react-hook-form";

import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import { Button, ButtonText } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import { getRoomProfileQueryOptions } from "@/api/queries/roomQueries";

import { RoomFormProvider, useRoomForm } from "@/contexts/RoomFormContext";
import { RoomProfileForm } from "@/validation/roomFormSchema";

import { BioSection } from "@/components/forms";
import { NameSection } from "@/components/forms/flat/NameSection";
import { RentSection } from "@/components/forms/room/RentSection";
import { PrivateRoomSection } from "@/components/forms/room/PrivateRoomSection";
import { FurnishedSection } from "@/components/forms/room/FurnishedSection";

const RoomScreen = () => {
  return (
    <RoomFormProvider>
      <RoomScreenContent />
    </RoomFormProvider>
  );
};

const RoomScreenContent = () => {
  const navigation = useNavigation();
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const { data: room, isLoading } = useQuery(
    getRoomProfileQueryOptions(Number(roomId))
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useFormContext<RoomProfileForm>();

  const { onSubmit, onError } = useRoomForm();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {room?.name ?? "Room"}
        </Text>
      ),
    });
  }, [navigation, room?.name]);

  if (isLoading) return <Text>Loading...</Text>;
  if (!room) return <Text>Room not found</Text>;

  return (
    <VStack className="px-5 py-4 flex-1 dark:bg-black bg-white" space="xl">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="xl">
          <NameSection control={control} errors={errors} />
          <Divider />
          <RentSection control={control} errors={errors} />
          <Divider />
          <PrivateRoomSection control={control} errors={errors} />
          <Divider />
          <FurnishedSection control={control} errors={errors} />
          <Divider />
          <BioSection control={control} errors={errors} />
        </VStack>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} />
      </ScrollView>

      {isDirty && (
        <Button onPress={handleSubmit(onSubmit, onError)}>
          <ButtonText>Save Changes</ButtonText>
        </Button>
      )}
    </VStack>
  );
};

export default RoomScreen;
