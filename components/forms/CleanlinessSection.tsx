import React from "react";
import { Controller } from "react-hook-form";
import { Cleanliness } from "@/types/enums/CLeanlinessEnum";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

const CleanlinessSection = ({ control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Cleanliness</Heading>
    <HStack space="sm" className="flex-wrap">
      {Object.values(Cleanliness).map((c) => (
        <Controller
          key={c}
          control={control}
          name="cleanliness"
          render={({ field: { onChange, value } }) => (
            <Pressable
              className={`px-4 py-2 rounded-full border ${
                value === c
                  ? "bg-info-900 dark:bg-info-100 border-primary-500"
                  : "border-gray-300"
              }`}
              onPress={() => onChange(c)}
            >
              <Text
                className={
                  value === c ? "text-white" : "text-black dark:text-white"
                }
              >
                {c}
              </Text>
            </Pressable>
          )}
        />
      ))}
    </HStack>
    {errors.cleanliness && (
      <Text className="text-error-500">{errors.cleanliness.message}</Text>
    )}
  </VStack>
);

export default CleanlinessSection;
