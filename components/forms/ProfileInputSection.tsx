import React from "react";
import { Controller } from "react-hook-form";

import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";

export const ProfileInputSection = ({ control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Basic Info</Heading>

    {["firstName", "lastName"].map((field) => (
      <VStack key={field} space="xs">
        <Text>{field === "firstName" ? "First Name" : "Last Name"}</Text>
        <Controller
          control={control}
          name={field}
          render={({ field: { onChange, value } }) => (
            <Input>
              <InputField
                value={value}
                onChangeText={onChange}
                placeholder={`Enter your ${
                  field === "firstName" ? "first" : "last"
                } name`}
              />
            </Input>
          )}
        />
        {errors[field] && (
          <Text className="text-error-500">{errors[field].message}</Text>
        )}
      </VStack>
    ))}
  </VStack>
);

export default ProfileInputSection;
