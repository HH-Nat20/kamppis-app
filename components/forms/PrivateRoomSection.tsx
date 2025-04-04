import React from "react";

import { Controller } from "react-hook-form";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";

const PrivateRoomSection = ({ control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Must have a Private Room</Heading>
    <Controller
      control={control}
      name="hasPrivateRoom"
      render={({ field: { onChange, value } }) => (
        <HStack space="sm">
          {["Yes", "No"].map((label) => {
            const selected = (label === "Yes") === value;
            return (
              <Pressable
                key={label}
                onPress={() => onChange(label === "Yes")}
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
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </HStack>
      )}
    />
    {errors.hasPrivateRoom && (
      <Text className="text-error-500">{errors.hasPrivateRoom.message}</Text>
    )}
  </VStack>
);

export default PrivateRoomSection;
