import React from "react";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import ContentBox from "../components/ContentBox";
import SaveButton from "../components/SaveButton";
import styles from "../ui/styles";
import { Controller, useFormContext } from "react-hook-form";
import { User } from "../types/User";
import Slider from "react-native-a11y-slider";
import { Gender } from "../types/enums/GenderEnum";
import { Location } from "../types/enums/LocationEnum";
import { useProfileForm } from "../contexts/ProfileFormContext";

export default function ProfilePreferencesScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }, // Track form changes using isDirty
  } = useFormContext<User>();

  const { onSubmit, onError } = useProfileForm();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ContentBox>
          <Text style={styles.text}>Match minimum age:</Text>
          <Controller
            control={control}
            name="minAgePreference"
            render={({ field: { onChange, value } }) => (
              <Slider
                max={99}
                min={18}
                values={[value ?? 18]}
                onChange={(values: number[]) => onChange(values[0])}
              />
            )}
          />
          {errors.minAgePreference && (
            <Text style={styles.failed}>{errors.minAgePreference.message}</Text>
          )}

          <Text style={styles.text}>Maximum age:</Text>
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
          {errors.maxAgePreference && (
            <Text style={styles.failed}>{errors.maxAgePreference.message}</Text>
          )}
        </ContentBox>

        <ContentBox>
          <Text style={styles.text}>Preferred gender(s):</Text>
          <View style={styles.radioGroup}>
            {Object.values(Gender).map((g) => (
              <Controller
                key={g}
                control={control}
                name="preferredGenders"
                render={({ field: { onChange, value } }) => (
                  <TouchableOpacity
                    style={[
                      styles.radioButton,
                      value?.includes(g) && styles.selectedRadio,
                    ]}
                    onPress={() => {
                      if (value?.includes(g)) {
                        onChange(value?.filter((v) => v !== g));
                      } else {
                        onChange([...value, g]);
                      }
                    }}
                  >
                    <Text style={styles.tag}>{g}</Text>
                  </TouchableOpacity>
                )}
              />
            ))}
          </View>
          {errors.preferredGenders && (
            <Text style={styles.failed}>{errors.preferredGenders.message}</Text>
          )}
        </ContentBox>

        <ContentBox>
          <Text style={styles.text}>Preferred location(s):</Text>
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
                      value?.includes(l) && styles.selectedRadio,
                    ]}
                    onPress={() => {
                      if (value?.includes(l)) {
                        onChange(value?.filter((v) => v !== l));
                      } else {
                        onChange([...value, l]);
                      }
                    }}
                  >
                    <Text style={styles.tag}>{l}</Text>
                  </TouchableOpacity>
                )}
              />
            ))}
          </View>
          {errors.preferredLocations && (
            <Text style={styles.failed}>
              {errors.preferredLocations.message}
            </Text>
          )}
        </ContentBox>

        <ContentBox>
          <Text style={styles.text}>Maximum rent:</Text>
          <Controller
            control={control}
            name="maxRent"
            render={({ field: { onChange, value } }) => {
              const getNumericValue = (rent: "LOW" | "MID" | "HIGH") => {
                switch (rent) {
                  case "LOW":
                    return 400;
                  case "MID":
                    return 600;
                  case "HIGH":
                    return 800;
                  default:
                    return 500;
                }
              };

              const getRentCategory = (num: number): "LOW" | "MID" | "HIGH" => {
                if (num <= 400) return "LOW";
                if (num <= 600) return "MID";
                return "HIGH";
              };

              return (
                <>
                  <Slider
                    max={1000}
                    min={200}
                    increment={50}
                    values={[getNumericValue(value as "LOW" | "MID" | "HIGH")]}
                    onChange={(values: number[]) =>
                      onChange(getRentCategory(values[0]))
                    }
                  />
                  <Text style={styles.text}>Selected: {value}</Text>
                </>
              );
            }}
          />
          {errors.maxRent && (
            <Text style={styles.failed}>{errors.maxRent.message}</Text>
          )}
        </ContentBox>
      </ScrollView>

      {/* Save button only shows if form is dirty */}
      {isDirty && <SaveButton onPress={handleSubmit(onSubmit, onError)} />}
    </SafeAreaView>
  );
}
