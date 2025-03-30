import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { useFormContext } from "react-hook-form";

import { useProfileForm } from "../contexts/ProfileFormContext";
import { ProfileForm } from "../validation/profileFormSchema";

import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { Button, ButtonText } from "@/components/ui/button";

import LifestyleSection from "./sections/LifestyleSection";
import CleanlinessSection from "./sections/CleanlinessSection";
import BioSection from "./sections/BioSection";
import ProfileDrawerLayout from "../components/ProfileDrawerLayout";

export default function ProfileLifestyleScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useFormContext<ProfileForm>();

  const { onSubmit, onError } = useProfileForm();

  return (
    <ProfileDrawerLayout>
      <VStack className="px-5 py-4 flex-1 dark:bg-black bg-white" space="xl">
        <Heading className="mb-2">Lifestyle</Heading>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space="xl">
            <LifestyleSection control={control} errors={errors} />
            <Divider />
            <CleanlinessSection control={control} errors={errors} />
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
    </ProfileDrawerLayout>
  );
}
