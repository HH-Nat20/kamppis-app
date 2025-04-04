import React from "react";
import { Controller } from "react-hook-form";
import { Lifestyle } from "@/types/enums/LifestyleEnum";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

export const LifestyleSection = ({ control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Lifestyle</Heading>
    <HStack space="sm" className="flex-wrap">
      {Object.values(Lifestyle).map((l) => (
        <Controller
          key={l}
          control={control}
          name="lifestyle"
          render={({ field: { onChange, value } }) => (
            <Pressable
              className={`px-4 py-2 rounded-full border ${
                value?.includes(l)
                  ? "bg-error-900 dark:bg-error-100 border-primary-500"
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
                {l.replace("_", " ")}
              </Text>
            </Pressable>
          )}
        />
      ))}
    </HStack>
    {errors.lifestyle && (
      <Text className="text-error-500">{errors.lifestyle.message}</Text>
    )}
  </VStack>
);

export default LifestyleSection;
