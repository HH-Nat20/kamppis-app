import React from "react";

import { Controller } from "react-hook-form";

import { VStack } from "@/components/ui/vstack";

import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";

import Slider from "react-native-a11y-slider";

export const TotalRoommatesSection = ({ control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Total Rooms</Heading>
    <Controller
      control={control}
      name="totalRoommates"
      render={({ field: { onChange, value } }) => (
        <>
          <Slider
            min={0}
            max={10}
            increment={1}
            values={[value ?? 2]}
            onChange={(values: number[]) => onChange(values[0])}
          />
          <Text>Selected: {value}</Text>
        </>
      )}
    />
    {errors.totalRoommates && (
      <Text className="text-error-500">{errors.totalRoommates.message}</Text>
    )}
  </VStack>
);

export default TotalRoommatesSection;
