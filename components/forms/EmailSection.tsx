import React from "react";
import { Controller } from "react-hook-form";

import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";

export const EmailSection = ({ editable = false, control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Email</Heading>

    <VStack space="xs">
      <Text>Email Address</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange } }) => (
          <Input isDisabled={!editable}>
            <InputField
              value={value}
              onChangeText={onChange}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={editable}
              selectTextOnFocus={editable}
            />
          </Input>
        )}
      />
      {errors.email && (
        <Text className="text-error-500">{errors.email.message}</Text>
      )}
    </VStack>
  </VStack>
);

export default EmailSection;
