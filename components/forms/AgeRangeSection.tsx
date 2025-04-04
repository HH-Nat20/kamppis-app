import React from "react";
import { Controller } from "react-hook-form";

import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";

import Slider from "react-native-a11y-slider";

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

export default AgeRangeSection;
