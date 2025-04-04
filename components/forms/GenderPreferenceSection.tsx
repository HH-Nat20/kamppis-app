import React from "react";
import { Controller } from "react-hook-form";

import { Gender } from "@/types/enums/GenderEnum";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

export const GenderPreferenceSection = ({ control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Preferred Genders</Heading>
    <Controller
      control={control}
      name="genderPreferences"
      render={({ field: { onChange, value = [] } }) => {
        const options = Object.values(Gender);
        const isAny = (g: string) => g === Gender.NOT_IMPORTANT;

        const handlePress = (selected: string) => {
          const realOptions = options.filter((g) => !isAny(g));

          if (isAny(selected)) {
            // Pressing "ANY" selects all other options, but not itself
            onChange(realOptions);
            return;
          }

          const alreadySelected = value.includes(selected);
          const newSelection = alreadySelected
            ? value.filter((v: string) => v !== selected)
            : [...value, selected];

          onChange(newSelection);
        };

        return (
          <HStack space="sm" className="flex-wrap">
            {options.map((g) => {
              if (isAny(g)) {
                // NEVER selected visually
                return (
                  <Pressable
                    key={g}
                    onPress={() => handlePress(g)}
                    className="px-4 py-2 rounded-full border border-gray-300"
                  >
                    <Text className="text-black dark:text-white">ANY</Text>
                  </Pressable>
                );
              }

              const isSelected = value.includes(g);
              return (
                <Pressable
                  key={g}
                  onPress={() => handlePress(g)}
                  className={`px-4 py-2 rounded-full border ${
                    isSelected
                      ? "bg-success-900 dark:bg-success-100 border-primary-500"
                      : "border-gray-300"
                  }`}
                >
                  <Text
                    className={
                      isSelected ? "text-white" : "text-black dark:text-white"
                    }
                  >
                    {g}
                  </Text>
                </Pressable>
              );
            })}
          </HStack>
        );
      }}
    />
    {errors.genderPreferences && (
      <Text className="text-error-500">{errors.genderPreferences.message}</Text>
    )}
  </VStack>
);

export default GenderPreferenceSection;
