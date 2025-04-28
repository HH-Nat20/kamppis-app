import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { useFormContext } from "react-hook-form";

import { UserForm } from "@/validation/userFormSchema";
import { useUserForm } from "@/contexts/UserFormContext";

import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";

import { UserFormProvider } from "@/contexts/UserFormContext";

import ProfileDrawerLayout from "@/components/custom/ProfileDrawerLayout";

import ProfileInputSection from "@/components/forms/ProfileInputSection";
import GenderSection from "@/components/forms/GenderSection";
import LookingForSection from "@/components/forms/LookingForSection";
import EmailSection from "@/components/forms/EmailSection";
import DateOfBirthSection from "@/components/forms/DateOfBirthSection";

const Personal = () => {
  return (
    <UserFormProvider>
      <ProfilePersonalScreen />
    </UserFormProvider>
  );
};

const ProfilePersonalScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useFormContext<UserForm>();

  const { onSubmit, onError } = useUserForm();

  return (
    <ProfileDrawerLayout>
      <VStack className="px-5 py-4 flex-1 dark:bg-black bg-white" space="xl">
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space="xl">
            <ProfileInputSection control={control} errors={errors} />
            <Divider />
            <EmailSection control={control} errors={errors} />
            <Divider />
            <GenderSection control={control} errors={errors} />
            <Divider />
            <LookingForSection control={control} errors={errors} />
            <Divider />
            <DateOfBirthSection control={control} errors={errors} />
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

export default Personal;
