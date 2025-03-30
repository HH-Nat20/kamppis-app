import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { useFormContext } from "react-hook-form";
import { usePersonalInfoForm } from "../contexts/PersonalInfoFormContext";
import { PersonalInfoForm } from "../validation/personalInfoSchema";

import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";

import ProfileDrawerLayout from "../components/ProfileDrawerLayout";

import ProfileInputSection from "./sections/ProfileInputSection";
import GenderSection from "./sections/GenderSection";

export default function ProfilePersonalScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useFormContext<PersonalInfoForm>();

  const { onSubmit, onError } = usePersonalInfoForm();

  return (
    <ProfileDrawerLayout>
      <VStack className="px-5 py-4 flex-1 dark:bg-black bg-white" space="xl">
        <Heading className="mb-2">Personal Info</Heading>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space="xl">
            <ProfileInputSection control={control} errors={errors} />
            <Divider />
            <GenderSection control={control} errors={errors} />
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
