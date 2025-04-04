import React, { useState } from "react";
import { Platform, Pressable as RNPressable } from "react-native";
import { Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";

import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";

export const formatDate = (date: Date) => date.toISOString().split("T")[0]; // YYYY-MM-DD

export const DateOfBirthSection = ({ control, errors }: any) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <VStack space="md">
      <Heading size="sm">Date of Birth</Heading>

      <Controller
        control={control}
        name="dateOfBirth"
        render={({ field: { onChange, value } }) => {
          const parsedDate = value ? new Date(value) : undefined;

          const onDateChange = (event: any, selectedDate?: Date) => {
            setShowPicker(Platform.OS === "ios"); // stay open on iOS
            if (selectedDate) {
              onChange(formatDate(selectedDate));
            }
          };

          return (
            <>
              <RNPressable onPress={() => setShowPicker(true)}>
                <Input pointerEvents="none">
                  <InputField
                    value={value}
                    placeholder="YYYY-MM-DD"
                    editable={false}
                  />
                </Input>
              </RNPressable>

              {showPicker && (
                <DateTimePicker
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  value={parsedDate ?? new Date(2000, 0, 1)}
                  onChange={onDateChange}
                  maximumDate={new Date()} // optional: no future dates
                />
              )}
            </>
          );
        }}
      />

      {errors.dateOfBirth && (
        <Text className="text-error-500">{errors.dateOfBirth.message}</Text>
      )}
    </VStack>
  );
};

export default DateOfBirthSection;
