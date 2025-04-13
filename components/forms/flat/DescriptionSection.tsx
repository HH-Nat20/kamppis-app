import React from "react";
import { Controller } from "react-hook-form";

import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Textarea, TextareaInput } from "@/components/ui/textarea";

export const DescriptionSection = ({ control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Description</Heading>
    <Controller
      control={control}
      name="description"
      render={({ field: { onChange, value } }) => (
        <Textarea
          size="lg"
          isInvalid={!!errors.description}
          className="w-full h-64"
        >
          <TextareaInput
            value={value}
            onChangeText={onChange}
            placeholder="Describe your flat in more detail"
          />
        </Textarea>
      )}
    />
    {errors.description && (
      <Text className="text-error-500">{errors.description.message}</Text>
    )}
  </VStack>
);

export default DescriptionSection;
