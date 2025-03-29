import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { usePreferencesForm } from "../contexts/PreferencesFormContext";
import { PreferencesForm } from "../validation/preferencesSchema";
import { Gender } from "../types/enums/GenderEnum";
import { Location } from "../types/enums/LocationEnum";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { Pressable } from "@/components/ui/pressable";
import { Button } from "@/components/ui/button";
import { ButtonText } from "@/components/ui/button";

import Slider from "react-native-a11y-slider";

import ProfileDrawerLayout from "../components/ProfileDrawerLayout";

export default function ProfilePreferencesScreen() {
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
            <RentSection control={control} errors={errors} />
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

const AgeRangeSection = ({ control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Age Preference</Heading>
    <VStack space="xs">
      <Text>Minimum Age</Text>
      <Controller
        control={control}
        name="minAgePreference"
        render={({ field: { onChange, value } }) => (
          <Slider
            min={18}
            max={99}
            values={[value ?? 18]}
            onChange={(values: number[]) => onChange(values[0])}
          />
        )}
      />
      {errors.minAgePreference && (
        <Text className="text-error-500">
          {errors.minAgePreference.message}
        </Text>
      )}
    </VStack>

    <VStack space="xs">
      <Text>Maximum Age</Text>
      <Controller
        control={control}
        name="maxAgePreference"
        render={({ field: { onChange, value } }) => (
          <Slider
            min={18}
            max={99}
            values={[value ?? 99]}
            onChange={(values: number[]) => onChange(values[0])}
          />
        )}
      />
      {errors.maxAgePreference && (
        <Text className="text-error-500">
          {errors.maxAgePreference.message}
        </Text>
      )}
    </VStack>
  </VStack>
);

const GenderPreferenceSection = ({ control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Preferred Genders</Heading>
    <HStack space="sm" className="flex-wrap">
      {Object.values(Gender).map((g) => (
        <Controller
          key={g}
          control={control}
          name="genderPreferences"
          render={({ field: { onChange, value } }) => (
            <Pressable
              className={`px-4 py-2 rounded-full border ${
                value?.includes(g)
                  ? "bg-success-900 dark:bg-success-100 border-primary-500"
                  : "border-gray-300"
              }`}
              onPress={() => {
                if (value?.includes(g)) {
                  onChange(value.filter((v: string) => v !== g));
                } else {
                  onChange([...(value || []), g]);
                }
              }}
            >
              <Text
                className={
                  value?.includes(g)
                    ? "text-white"
                    : "text-black dark:text-white"
                }
              >
                {g}
              </Text>
            </Pressable>
          )}
        />
      ))}
    </HStack>
    {errors.genderPreferences && (
      <Text className="text-error-500">{errors.genderPreferences.message}</Text>
    )}
  </VStack>
);

const LocationPreferenceSection = ({ control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Preferred Locations</Heading>
    <HStack space="sm" className="flex-wrap">
      {Object.values(Location).map((l) => (
        <Controller
          key={l}
          control={control}
          name="locationPreferences"
          render={({ field: { onChange, value } }) => (
            <Pressable
              className={`px-4 py-2 rounded-full border ${
                value?.includes(l)
                  ? "bg-warning-500 dark:bg-warning-600 border-primary-500"
                  : "border-gray-300"
              }`}
              onPress={() => {
                if (value?.includes(l)) {
                  onChange(value.filter((v: string) => v !== l));
                } else {
                  onChange([...(value || []), l]);
                }
              }}
            >
              <Text
                className={
                  value?.includes(l)
                    ? "text-white"
                    : "text-black dark:text-white"
                }
              >
                {l}
              </Text>
            </Pressable>
          )}
        />
      ))}
    </HStack>
    {errors.locationPreferences && (
      <Text className="text-error-500">
        {errors.locationPreferences.message}
      </Text>
    )}
  </VStack>
);

const RentSection = ({ control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Max Rent</Heading>
    <Controller
      control={control}
      name="maxRent"
      render={({ field: { onChange, value } }) => (
        <>
          <Slider
            min={200}
            max={1500}
            increment={50}
            values={[value ?? 1000]}
            onChange={(values: number[]) => onChange(values[0])}
          />
          <Text>Selected: {value}</Text>
        </>
      )}
    />
    {errors.maxRent && (
      <Text className="text-error-500">{errors.maxRent.message}</Text>
    )}
  </VStack>
);
