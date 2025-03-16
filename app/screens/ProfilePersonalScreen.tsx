import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "../ui/styles";
import React from "react";
import { User } from "../types/User";
import { Controller, useFormContext } from "react-hook-form";
import { Gender } from "../types/enums/GenderEnum";
import { Lifestyle } from "../types/enums/LifestyleEnum";
import { useNavigation } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { ProfileTabParamList } from "../navigation/TopTabNavigator";
import { useProfileForm } from "../contexts/ProfileFormContext";
import { Cleanliness } from "../types/enums/CLeanlinessEnum";

type ProfilePersonalScreenNavigationProp = MaterialTopTabNavigationProp<
  ProfileTabParamList,
  "Personal Info"
>;

export default function ProfilePersonalScreen() {
  const navigation = useNavigation<ProfilePersonalScreenNavigationProp>();

  const { control, handleSubmit } = useFormContext<User>();
  const {
    onSubmit,
    onError,
    formState: { errors },
  } = useProfileForm();

  return (
    <ScrollView style={styles.scrollContainer}>
      <Text style={styles.title}>Tell us about yourself</Text>
      <View style={{ flex: 1, padding: 20 }}>
        <View style={styles.separator} />
        <Text style={styles.text}>First Name:</Text>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter your first name"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.firstName && (
          <Text style={styles.failed}>{errors.firstName.message}</Text>
        )}

        <Text style={styles.text}>Last Name:</Text>
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter your last name"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.lastName && (
          <Text style={styles.failed}>{errors.lastName.message}</Text>
        )}

        <Text style={styles.text}>Age:</Text>
        <Controller
          control={control}
          name="age"
          render={({ field: { onChange, value } }) => (
            <TextInput
              editable={false} // Age is not editable
              style={{ ...styles.input, color: "gray" }}
              value={String(value) + " years. (not editable here)"}
              keyboardType="numeric"
              onChangeText={(text) => onChange(parseInt(text) || 0)}
            />
          )}
        />
        {errors.age && <Text style={styles.failed}>{errors.age.message}</Text>}
        <View style={styles.separator} />

        <Text style={styles.text}>Gender (select one):</Text>
        <View style={styles.radioGroup}>
          {Object.values(Gender).map((g) => (
            <Controller
              key={g}
              control={control}
              name="gender"
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
        {errors.gender && (
          <Text style={styles.failed}>{errors.gender.message}</Text>
        )}
        <View style={styles.separator} />

        <Text style={styles.text}>Lifestyle (select one or more):</Text>
        <View style={styles.radioGroup}>
          {Object.values(Lifestyle).map((l) => (
            <Controller
              key={l}
              control={control}
              name="lifestyle"
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
                  <Text style={styles.tooltipText}>{l.replace("_", " ")}</Text>
                </TouchableOpacity>
              )}
            />
          ))}
        </View>
        {errors.lifestyle && (
          <Text style={styles.failed}>{errors.lifestyle.message}</Text>
        )}
        <View style={styles.separator} />

        <Text style={styles.text}>Cleanliness (select one):</Text>
        <View style={styles.radioGroup}>
          {Object.values(Cleanliness).map((c) => (
            <Controller
              key={c}
              control={control}
              name="cleanliness"
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    value === c && styles.selectedRadio,
                  ]}
                  onPress={() => onChange(c)}
                >
                  <Text style={styles.cleanlinessTag}>{c}</Text>
                </TouchableOpacity>
              )}
            />
          ))}
        </View>
        {errors.cleanliness && (
          <Text style={styles.failed}>{errors.cleanliness.message}</Text>
        )}
        <View style={styles.separator} />

        <Text style={styles.text}>Bio:</Text>
        <Controller
          control={control}
          name="bio"
          render={({ field: { onChange, value } }) => (
            <TextInput
              multiline
              style={{ ...styles.input, height: 120 }}
              placeholder="Enter your bio"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.bio && <Text style={styles.failed}>{errors.bio.message}</Text>}
        <View style={styles.separator} />

        {/* Save and Next buttons */}
        <View
          style={{
            height: 50,
            flexDirection: "row", // Align buttons in a row
            justifyContent: "space-between", // Space between buttons
            alignItems: "center", // Align them vertically in the center
            padding: 10,
          }}
        >
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit(onSubmit, onError)}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate("Match Preferences")}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
