import React, { useState } from "react";
import { Text, View, Button, ScrollView, TextInput } from "react-native";
import styles from "../ui/styles";
import { useNavigation } from "expo-router";
import { useUser } from "../contexts/UserContext";
import { Controller, useFormContext } from "react-hook-form";
import { User } from "../types/User";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { ProfileTabParamList } from "../navigation/TopTabNavigator";

type ProfilePreferencesScreenNavigationProp = MaterialTopTabNavigationProp<
  ProfileTabParamList,
  "Match Preferences"
>;

export default function ProfilePreferencesScreen() {
  const navigation = useNavigation<ProfilePreferencesScreenNavigationProp>();
  const { control, handleSubmit } = useFormContext<User>();

  const onSubmit = async (data: User) => {
    console.log("ProfilePreferencesScreen onSubmit", data);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <Text style={styles.title}>What are your roommate preferences?</Text>
      <View style={{ flex: 1, padding: 20 }}>
        <View style={styles.separator} />
        <Text style={styles.text}>Match minimum age:</Text>
        <Controller
          control={control}
          name="minAgePreference"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(value)}
              onChangeText={(text) => onChange(parseInt(text))}
            />
          )}
        />
        <View style={styles.separator} />

        <Text style={styles.text}>Match maximum age:</Text>
        <Controller
          control={control}
          name="maxAgePreference"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(value)}
              onChangeText={(text) => onChange(parseInt(text))}
            />
          )}
        />
        <View style={styles.separator} />
      </View>
    </ScrollView>
  );
}
