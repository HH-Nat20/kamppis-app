import React from "react";
import { Controller } from "react-hook-form";
import { Gender } from "@/types/enums/GenderEnum";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

export const GenderSection = ({ control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Gender</Heading>
    <Controller
      control={control}
      name="gender"
      render={({ field: { onChange, value } }) => (
        <HStack space="sm" className="flex-wrap">
          {Object.values(Gender).map((g) => (
            <Pressable
              key={g}
              className={`px-4 py-2 rounded-full border ${
                value === g
                  ? "bg-success-900 dark:bg-success-100 border-primary-500"
                  : "border-gray-300"
              }`}
              onPress={() => onChange(g)}
            >
              <Text
                className={
                  value === g ? "text-white" : "text-black dark:text-white"
                }
              >
                {g === "NOT_IMPORTANT" ? "PREFER NOT TO SAY" : g}
              </Text>
            </Pressable>
          ))}
        </HStack>
      )}
    />
    {errors.gender && (
      <Text className="text-error-500">{errors.gender.message}</Text>
    )}
  </VStack>
);

export default GenderSection;
