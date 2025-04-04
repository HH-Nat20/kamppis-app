import React from "react";
import { Controller } from "react-hook-form";

import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";

import Slider from "react-native-a11y-slider";

const MaxRentSection = ({ control, errors }: any) => (
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

export default MaxRentSection;
