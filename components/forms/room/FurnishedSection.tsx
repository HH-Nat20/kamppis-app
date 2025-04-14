import React, { useEffect } from "react";
import { Controller, useWatch, useFormContext } from "react-hook-form";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Input, InputField } from "@/components/ui/input";

export const FurnishedSection = ({ control, errors }: any) => {
  const { setValue } = useFormContext();
  const furnished = useWatch({ control, name: "furnished" });

  useEffect(() => {
    if (!furnished) {
      setValue("furnishedInfo", undefined);
    }
  }, [furnished, setValue]);

  return (
    <VStack space="md">
      <Heading size="sm">Is the room furnished?</Heading>
      <Controller
        control={control}
        name="furnished"
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
      {errors.furnished && (
        <Text className="text-error-500">{errors.furnished.message}</Text>
      )}

      {furnished && (
        <VStack space="xs">
          <Heading size="sm">Furnishing Details</Heading>
          <Controller
            control={control}
            name="furnishedInfo"
            render={({ field: { onChange, value } }) => (
              <Input>
                <InputField
                  value={value}
                  onChangeText={onChange}
                  placeholder="e.g., Bed, Desk, Wardrobe"
                />
              </Input>
            )}
          />
          {errors.furnishedInfo && (
            <Text className="text-error-500">
              {errors.furnishedInfo.message}
            </Text>
          )}
        </VStack>
      )}
    </VStack>
  );
};

export default FurnishedSection;
