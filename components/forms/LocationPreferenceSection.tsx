import React from "react";
import { Controller } from "react-hook-form";

import { Location } from "@/types/enums/LocationEnum";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";

import { Pressable } from "@/components/ui/pressable";

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

export default LocationPreferenceSection;
