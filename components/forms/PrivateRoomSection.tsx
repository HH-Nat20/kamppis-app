import React from "react";

import { Controller } from "react-hook-form";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

export const PrivateRoomSection = ({ control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Room Privacy Preference</Heading>
    <Controller
      control={control}
      name="hasPrivateRoom"
      render={({ field: { onChange, value } }) => {
        const options = [
          { label: "Private Room", value: true },
          { label: "Shared Room", value: false },
          { label: "No Preference", value: null },
        ];

        return (
          <HStack space="sm" className="flex-wrap">
            {options.map((option) => {
              const selected = value === option.value;
              return (
                <Pressable
                  key={option.label}
                  onPress={() => onChange(option.value)}
                  className={`px-4 py-2 rounded-full border ${
                    selected
                      ? "bg-info-900 dark:bg-info-200 border-primary-500"
                      : "border-gray-300"
                  }`}
                >
                  <Text
                    className={
                      selected ? "text-white" : "text-black dark:text-white"
                    }
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </HStack>
        );
      }}
    />
    {errors.hasPrivateRoom && (
      <Text className="text-error-500">{errors.hasPrivateRoom.message}</Text>
    )}
  </VStack>
);

export default PrivateRoomSection;
