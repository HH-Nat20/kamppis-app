import React from "react";
import { Controller } from "react-hook-form";

import { Pets } from "@/types/enums/PetsEnum";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

export const PetsSection = ({ control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Pets</Heading>
    <Controller
      control={control}
      name="pets"
      rules={{ required: "Please select a pets option." }}
      render={({ field: { onChange, value } }) => (
        <HStack space="sm" className="flex-wrap">
          {Object.values(Pets).map((l) => {
            const isSelected = value === l;
            return (
              <Pressable
                key={l}
                className={`px-4 py-2 rounded-full border ${
                  isSelected
                    ? "bg-warning-500 dark:bg-warning-600 border-primary-500"
                    : "border-gray-300"
                }`}
                onPress={() => onChange(l)}
              >
                <Text
                  className={
                    isSelected ? "text-white" : "text-black dark:text-white"
                  }
                >
                  {l.replace(/_/g, " ").toLowerCase()}
                </Text>
              </Pressable>
            );
          })}
        </HStack>
      )}
    />
    {errors.pets && (
      <Text className="text-error-500">{errors.pets.message}</Text>
    )}
  </VStack>
);

export default PetsSection;
