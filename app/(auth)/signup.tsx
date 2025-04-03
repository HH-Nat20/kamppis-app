import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema, UserForm } from "../../validation/userFormSchema"; // Adjust path
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Platform,
  Pressable as RNPressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Gender } from "../../types/enums/GenderEnum";
import { LookingFor } from "../../types/enums/LookingForEnum";
import { router } from "expo-router";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import AsyncStorage from "@react-native-async-storage/async-storage";

const formatDate = (date: Date) => date.toISOString().split("T")[0]; // YYYY-MM-DD

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: Gender.NOT_IMPORTANT, // Default value
      dateOfBirth: new Date(2000, 0, 1).toISOString().split("T")[0], // Default to today
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
      if (!response.ok) throw new Error("Login failed");

      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const [showPicker, setShowPicker] = useState(false);

  const onSubmit = (data: UserForm) => {
    Alert.alert("Data sent:", JSON.stringify(data, null, 2));
    // Handle form submission (e.g., send data to server)
    sendUserData(data);
    router.push("/"); // Navigate to home screen after submission
  };

  return (
    <VStack space="md">
      <View style={{ padding: 20 }}>
        {/* First Name */}
        <Text>First Name</Text>
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.firstName && (
          <Text style={styles.error}>{errors.firstName.message}</Text>
        )}

        {/* Last Name */}
        <Text>Last Name</Text>
        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.lastName && (
          <Text style={styles.error}>{errors.lastName.message}</Text>
        )}

        {/* Email */}
        <Text>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={field.value}
              onChangeText={field.onChange}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}

        {/* Gender Picker */}
        <Text>Gender</Text>
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <Picker
              selectedValue={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              {Object.values(Gender).map((g) => (
                <Picker.Item key={g} label={g} value={g} />
              ))}
            </Picker>
          )}
        />

        {/* Date Picker */}
        <Text>Date of Birth</Text>
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
          <Text style={styles.error}>{errors.dateOfBirth.message}</Text>
        )}

        {/* LookingFor Picker */}
        <Text>Looking For</Text>
        <Controller
          control={control}
          name="lookingFor"
          render={({ field }) => (
            <Picker
              selectedValue={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              {Object.values(LookingFor).map((l) => (
                <Picker.Item key={l} label={l} value={l} />
              ))}
            </Picker>
          )}
        />

        {/* Submit Button */}
        <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
      </View>
    </VStack>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  error: {
    color: "red",
  },
};
