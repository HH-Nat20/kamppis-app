import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { useFormContext } from "react-hook-form";
import {
  PreferencesFormProvider,
  usePreferencesForm,
} from "@/contexts/PreferencesFormContext";
import { PreferencesForm } from "@/validation/preferencesSchema";

import { VStack } from "@/components/ui/vstack";

import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";

import { Button } from "@/components/ui/button";
import { ButtonText } from "@/components/ui/button";

import AgeRangeSection from "@/components/forms/AgeRangeSection";
import GenderPreferenceSection from "@/components/forms/GenderPreferenceSection";
import LocationPreferenceSection from "@/components/forms/LocationPreferenceSection";
import MaxRentSection from "@/components/forms/MaxRentSection";
import PrivateRoomSection from "@/components/forms/PrivateRoomSection";
import MaxRoommatesSection from "@/components/forms/MaxRoommatesSection";

import ProfileDrawerLayout from "@/components/custom/ProfileDrawerLayout";

const Preferences = () => {
  return (
    <PreferencesFormProvider>
      <ProfilePreferencesScreen />
    </PreferencesFormProvider>
  );
};

const ProfilePreferencesScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useFormContext<PreferencesForm>();

  const { onSubmit, onError } = usePreferencesForm();

  return (
    <ProfileDrawerLayout>
      <VStack className="px-5 py-4 flex-1 dark:bg-black bg-white" space="xl">
        <Heading className="mb-2">Preferences</Heading>
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space="xl">
            <AgeRangeSection control={control} errors={errors} />
            <Divider />
            <GenderPreferenceSection control={control} errors={errors} />
            <Divider />
            <LocationPreferenceSection control={control} errors={errors} />
            <Divider />
            <MaxRentSection control={control} errors={errors} />
            <Divider />
            <PrivateRoomSection control={control} errors={errors} />
            <Divider />
            <MaxRoommatesSection control={control} errors={errors} />
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
};

export default Preferences;
