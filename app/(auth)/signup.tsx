import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema, UserForm } from "@/validation/userFormSchema"; // Adjust path
import {
  View,
  Text,
  TextInput,
  Alert,
  Platform,
  Pressable as RNPressable,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Gender } from "@/types/enums/GenderEnum";
import { LookingFor } from "@/types/enums/LookingForEnum";
import { router } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Heading } from "@/components/ui/heading";
import {
  DateOfBirthSection,
  EmailSection,
  GenderSection,
  LookingForSection,
  ProfileInputSection,
} from "@/components/forms";
import { Divider } from "@/components/ui/divider";
import { ButtonText, Button } from "@/components/ui/button";
import { isDirty } from "zod";
import Toast from "react-native-toast-message";

const formatDate = (date: Date) => date.toISOString().split("T")[0]; // YYYY-MM-DD

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UserForm>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: Gender.NOT_IMPORTANT, // Default value
      dateOfBirth: new Date(2000, 0, 1).toISOString().split("T")[0], // Default date
      lookingFor: LookingFor.OTHER_USER_PROFILES, // Default
    },
  });

  const sendUserData = async (data: UserForm) => {
    const code = await AsyncStorage.getItem("githubAuthCode");
    console.log("Sending user data with code:", code);
    console.log("User data:", data);
    try {
      const response = await fetch(
        `https://kamppis.hellmanstudios.fi/api/login/signup?code=${encodeURIComponent(
          code!
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log("Response:", response);
      const responseBody = await response.json();
      if (!response.ok) {
        const errorMessage =
          responseBody?.error || "Unknown error occurred during signup.";
        throw new Error(errorMessage);
      }
      router.push({
        pathname: "/",
        params: { signupSuccess: 1 }, // Pass success message to home screen
      });
    } catch (error: any) {
      console.error("Signup error:", error.message);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

  const [showPicker, setShowPicker] = useState(false);

  const onSubmit = (data: UserForm) => {
    console.log("Data sent:", JSON.stringify(data, null, 2));
    // Handle form submission (e.g., send data to server)
    sendUserData(data);
  };

  return (
    <VStack className="px-5 py-4 flex-1 dark:bg-black bg-white" space="xl">
      <Heading className="mb-2">Personal Info</Heading>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="xl">
          <ProfileInputSection control={control} errors={errors} />
          <Divider />
          <EmailSection editable={true} control={control} errors={errors} />
          <Divider />
          <GenderSection control={control} errors={errors} />
          <Divider />
          <LookingForSection control={control} errors={errors} />
          <Divider />
          <DateOfBirthSection
            editable={true}
            control={control}
            errors={errors}
          />
        </VStack>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} />
      </ScrollView>

      {isDirty && (
        <Button onPress={handleSubmit(onSubmit)}>
          <ButtonText>Save Changes</ButtonText>
        </Button>
      )}
    </VStack>
  );
}

// const styles = {
//   input: {
//     borderWidth: 1,
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 5,
//   },
//   error: {
//     color: "red",
//   },
// };
