import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import styles from "../ui/styles";
import { useNavigation } from "expo-router";
import { Controller, useFormContext } from "react-hook-form";
import { User } from "../types/User";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { ProfileTabParamList } from "../navigation/TopTabNavigator";
import Slider from "react-native-a11y-slider";
import { Gender } from "../types/enums/GenderEnum";
import { Location } from "../types/enums/LocationEnum";

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
            <Slider
              max={99}
              min={18}
              values={[value ?? 18]} // Values must be an array, so two values can be used for a range slider
              onChange={(values: number[]) => onChange(values[0])}
            />
          )}
        />
        <View style={styles.separator} />

        <Text style={styles.text}>Match maximum age:</Text>
        <Controller
          control={control}
          name="maxAgePreference"
          render={({ field: { onChange, value } }) => (
            <Slider
              max={99}
              min={18}
              values={[value ?? 99]}
              onChange={(values: number[]) => onChange(values[0])}
            />
          )}
        />
        <View style={styles.separator} />

        <Text style={styles.text}>Match preferred gender (select one):</Text>
        <View style={styles.radioGroup}>
          {Object.values(Gender).map((g) => (
            <Controller
              key={g}
              control={control}
              name="preferredGender"
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    value === g && styles.selectedRadio,
                  ]}
                  onPress={() => onChange(g)}
                >
                  <Text style={styles.tag}>{g}</Text>
                </TouchableOpacity>
              )}
            />
          ))}
        </View>
        <View style={styles.separator} />

        <Text style={styles.text}>Locations:</Text>
        <View style={styles.radioGroup}>
          {Object.values(Location).map((l) => (
            <Controller
              key={l}
              control={control}
              name="preferredLocations"
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    value.includes(l) && styles.selectedRadio,
                  ]}
                  onPress={() => {
                    if (value.includes(l)) {
                      onChange(value.filter((v) => v !== l));
                    } else {
                      onChange([...value, l]);
                    }
                  }}
                >
                  <Text style={styles.text}>{l}</Text>
                </TouchableOpacity>
              )}
            />
          ))}
        </View>
        <View style={styles.separator} />

        <Text style={styles.text}>Maximum rent:</Text>
        <Controller
          control={control}
          name="maxRent"
          render={({ field: { onChange, value } }) => {
            // Convert string value ("LOW", "MEDIUM", "HIGH") back to a number for the slider
            const getNumericValue = (rent: "LOW" | "MEDIUM" | "HIGH") => {
              switch (rent) {
                case "LOW":
                  return 400;
                case "MEDIUM":
                  return 700;
                case "HIGH":
                  return 1000;
                default:
                  return 500;
              }
            };

            // Convert numeric value back to "LOW", "MEDIUM", or "HIGH"
            const getRentCategory = (
              num: number
            ): "LOW" | "MEDIUM" | "HIGH" => {
              if (num <= 400) return "LOW";
              if (num <= 700) return "MEDIUM";
              return "HIGH";
            };

            return (
              <>
                <Slider
                  max={1000}
                  min={200}
                  increment={50}
                  values={[getNumericValue(value as "LOW" | "MEDIUM" | "HIGH")]}
                  onChange={(values: number[]) =>
                    onChange(getRentCategory(values[0]))
                  }
                />
                <Text style={styles.text}>Selected: {value}</Text>
                {/* Show the current selection */}
              </>
            );
          }}
        />
        <View style={styles.separator} />
      </View>
    </ScrollView>
  );
}
