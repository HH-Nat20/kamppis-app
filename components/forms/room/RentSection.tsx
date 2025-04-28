import React from "react";
import { Controller } from "react-hook-form";
import CurrencyInput from "react-native-currency-input";

import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export const RentSection = ({ control, errors }: any) => {
  return (
    <VStack space="md">
      <VStack space="xs">
        <Heading size="sm">Rent</Heading>
        <Controller
          control={control}
          name="rent"
          render={({ field: { onChange, value } }) => (
            <CurrencyInput
              value={value}
              onChangeValue={onChange}
              prefix="€"
              delimiter="."
              separator=","
              precision={0}
              minValue={0}
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 4,
                padding: 10,
                fontSize: 16,
                color: "#C0C0C0",
              }}
              placeholder="Enter rent amount"
            />
          )}
        />
        {errors["rent"] && (
          <Text className="text-error-500">{errors["rent"].message}</Text>
        )}
      </VStack>
    </VStack>
  );
};

export default RentSection;
