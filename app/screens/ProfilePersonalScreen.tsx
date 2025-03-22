import React from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { useProfileForm } from "../contexts/ProfileFormContext";
import { User } from "../types/responses/User";
import { UserProfileForm } from "../types/requests/UserProfileForm";
import { Gender } from "../types/enums/GenderEnum";
import { Lifestyle } from "../types/enums/LifestyleEnum";
import { Cleanliness } from "../types/enums/CLeanlinessEnum";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ButtonText } from "@/components/ui/button";
import { Pressable } from "@/components/ui/pressable";
import { Divider } from "@/components/ui/divider";
import { Box } from "@/components/ui/box";
import { Textarea, TextareaInput } from "@/components/ui/textarea";

export default function ProfilePersonalScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useFormContext<UserProfileForm>();

  const { onSubmit, onError } = useProfileForm();

  return (
    <VStack className="px-5 py-4 flex-1 dark:bg-black bg-white" space="xl">
      <Heading className="mb-2">Personal Details</Heading>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="xl">
          <ProfileInputSection control={control} errors={errors} />
          <Divider />
          <GenderSection control={control} errors={errors} />
          <Divider />
          <LifestyleSection control={control} errors={errors} />
          <Divider />
          <CleanlinessSection control={control} errors={errors} />
          <Divider />
          <BioSection control={control} errors={errors} />
        </VStack>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} />
      </ScrollView>

      {isDirty && (
        <Button onPress={handleSubmit(onSubmit, onError)}>
          <ButtonText>Save Changes</ButtonText>
        </Button>
      )}
    </VStack>
  );
}

const ProfileInputSection = ({ control, errors }: any) => (
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

const GenderSection = ({ control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Gender</Heading>
    <HStack space="sm" className="flex-wrap">
      {Object.values(Gender).map((g) => (
        <Controller
          key={g}
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <Pressable
              className={`px-4 py-2 rounded-full border ${
                value === g
                  ? "bg-success-900 dark:bg-success-100 border-primary-500"
                  : "border-gray-300"
              }`}
              onPress={() => onChange(g)}
            >
              <Text
                className={
                  value === g ? "text-white" : "text-black dark:text-white"
                }
              >
                {g === "NOT_IMPORTANT" ? "PREFER NOT TO SAY" : g}
              </Text>
            </Pressable>
          )}
        />
      ))}
    </HStack>
    {errors.gender && (
      <Text className="text-error-500">{errors.gender.message}</Text>
    )}
  </VStack>
);

const LifestyleSection = ({ control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Lifestyle</Heading>
    <HStack space="sm" className="flex-wrap">
      {Object.values(Lifestyle).map((l) => (
        <Controller
          key={l}
          control={control}
          name="lifestyle"
          render={({ field: { onChange, value } }) => (
            <Pressable
              className={`px-4 py-2 rounded-full border ${
                value?.includes(l)
                  ? "bg-error-900 dark:bg-error-100 border-primary-500"
                  : "border-gray-300"
              }`}
              onPress={() => {
                if (value?.includes(l)) {
                  onChange(value.filter((v: string) => v !== l));
                } else {
                  onChange([...(value || []), l]);
                }
              }}
            >
              <Text
                className={
                  value?.includes(l)
                    ? "text-white"
                    : "text-black dark:text-white"
                }
              >
                {l.replace("_", " ")}
              </Text>
            </Pressable>
          )}
        />
      ))}
    </HStack>
    {errors.lifestyle && (
      <Text className="text-error-500">{errors.lifestyle.message}</Text>
    )}
  </VStack>
);

const CleanlinessSection = ({ control, errors }: any) => (
  <VStack space="md">
    <Heading size="sm">Cleanliness</Heading>
    <HStack space="sm" className="flex-wrap">
      {Object.values(Cleanliness).map((c) => (
        <Controller
          key={c}
          control={control}
          name="cleanliness"
          render={({ field: { onChange, value } }) => (
            <Pressable
              className={`px-4 py-2 rounded-full border ${
                value === c
                  ? "bg-info-900 dark:bg-info-100 border-primary-500"
                  : "border-gray-300"
              }`}
              onPress={() => onChange(c)}
            >
              <Text
                className={
                  value === c ? "text-white" : "text-black dark:text-white"
                }
              >
                {c}
              </Text>
            </Pressable>
          )}
        />
      ))}
    </HStack>
    {errors.cleanliness && (
      <Text className="text-error-500">{errors.cleanliness.message}</Text>
    )}
  </VStack>
);

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
