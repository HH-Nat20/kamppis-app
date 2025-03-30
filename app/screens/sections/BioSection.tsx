import React from "react";
import { Controller } from "react-hook-form";

import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Textarea, TextareaInput } from "@/components/ui/textarea";

const BioSection = ({ control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Bio</Heading>
    <Controller
      control={control}
      name="bio"
      render={({ field: { onChange, value } }) => (
        <Textarea size="lg" isInvalid={!!errors.bio} className="w-full h-64">
          <TextareaInput
            value={value}
            onChangeText={onChange}
            placeholder="Tell us about yourself"
          />
        </Textarea>
      )}
    />
    {errors.bio && <Text className="text-error-500">{errors.bio.message}</Text>}
  </VStack>
);

export default BioSection;
