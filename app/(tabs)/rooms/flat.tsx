import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { useFormContext } from "react-hook-form";

import { useFlatForm } from "@/contexts/FlatFormContext";
import { FlatForm } from "@/validation/flatFormSchema";

import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { Button, ButtonText } from "@/components/ui/button";

import RoomsDrawerLayout from "@/components/custom/RoomsDrawerLayout";

import NameSection from "@/components/forms/flat/NameSection";
import DescriptionSection from "@/components/forms/flat/DescriptionSection";
import LocationSection from "@/components/forms/flat/LocationSection";
import TotalRoommatesSection from "@/components/forms/flat/TotalRoommatesSection";

import { FlatFormProvider } from "@/contexts/FlatFormContext";

const FlatScreen = () => {
  return (
    <FlatFormProvider>
      <FlatScreenContent />
    </FlatFormProvider>
  );
};

const FlatScreenContent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useFormContext<FlatForm>();

  const { onSubmit, onError } = useFlatForm();

  return (
    <RoomsDrawerLayout>
      <VStack className="px-5 py-4 flex-1 dark:bg-black bg-white" space="xl">
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space="xl">
            <NameSection control={control} errors={errors} />
            <Divider />
            <DescriptionSection control={control} errors={errors} />
            <Divider />
            <LocationSection control={control} errors={errors} />
            <Divider />
            <TotalRoommatesSection control={control} errors={errors} />
            <Divider />
          </VStack>
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} />
        </ScrollView>

        {isDirty && (
          <Button onPress={handleSubmit(onSubmit, onError)}>
            <ButtonText>Save Changes</ButtonText>
          </Button>
        )}
      </VStack>
    </RoomsDrawerLayout>
  );
};

export default FlatScreen;
