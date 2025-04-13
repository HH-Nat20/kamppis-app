import React from "react";
import { Controller } from "react-hook-form";
import { Utilities } from "@/types/enums/UtilitiesEnum";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

import { renderTag } from "@/components/common/TagArea";

export const FlatUtilitiesSection = ({ control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Utilities</Heading>
    <HStack space="sm" className="flex-wrap">
      {Object.values(Utilities).map((l) => (
        <Controller
          key={l}
          control={control}
          name="flatUtilities"
          render={({ field: { onChange, value } }) => (
            <Pressable
              className={`px-4 py-2 rounded-full border ${
                value?.includes(l)
                  ? "bg-success-900 dark:bg-success-100 border-primary-500"
                  : "border-gray-300 bg-success-100 dark:bg-success-900"
              }`}
              onPress={() => {
                if (value?.includes(l)) {
                  onChange(value.filter((v: string) => v !== l));
                } else {
                  onChange([...(value || []), l]);
                }
              }}
            >
              {renderTag(l)}
            </Pressable>
          )}
        />
      ))}
    </HStack>
    {errors.flatUtilities && (
      <Text className="text-error-500">{errors.flatUtilities.message}</Text>
    )}
  </VStack>
);

export default FlatUtilitiesSection;
