import React from "react";
import { Controller } from "react-hook-form";

import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";

export const NameSection = ({ control, errors }: any) => (
  <VStack space="md">
    <VStack space="xs">
      <Heading size="sm">Name</Heading>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input>
            <InputField
              value={value}
              onChangeText={onChange}
              placeholder={`Descriptive name`}
            />
          </Input>
        )}
      />
      {errors["name"] && (
        <Text className="text-error-500">{errors["name"].message}</Text>
      )}
    </VStack>
  </VStack>
);

export default NameSection;
