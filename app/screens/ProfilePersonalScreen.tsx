import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "../ui/styles";
import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { User } from "../types/User";
import dao from "../ajax/dao";
import { Controller, useFormContext } from "react-hook-form";
import { Gender } from "../types/enums/GenderEnum";
import { Lifestyle } from "../types/enums/LifestyleEnum";
import { useNavigation } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { ProfileTabParamList } from "../navigation/TopTabNavigator";

type ProfilePersonalScreenNavigationProp = MaterialTopTabNavigationProp<
  ProfileTabParamList,
  "Personal Info"
>;

export default function ProfilePersonalScreen() {
  const navigation = useNavigation<ProfilePersonalScreenNavigationProp>();
  const { user } = useUser();
  const [myProfile, setMyProfile] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const { control, handleSubmit, reset } = useFormContext<User>();

  const fetchProfile = async () => {
    if (!user) {
      console.warn("No user found");
      setLoading(false);
      return;
    }
    setLoading(true);
    const userProfile = await dao.getUserProfile(user.id);
    setMyProfile(userProfile);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  // If user changes, repopulate the form with the new user's data
  useEffect(() => {
    if (myProfile) {
      reset(myProfile); // Immediately updates all fields
    }
  }, [myProfile, reset]);

  const onSubmit = async (data: User) => {
    try {
      if (user && myProfile) {
        const updatedProfile = await dao.updateUserProfile(user.id, data);
        setMyProfile(updatedProfile);
        alert("Profile updated successfully!");
      } else {
        // TODO: implement create profile dao method
        // const newProfile = await dao.createUserProfile(data);
        // setMyProfile(newProfile);
        alert("Profile created successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <Text style={styles.title}>Tell us about yourself</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
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

          <View style={styles.separator} />
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
              onPress={handleSubmit(onSubmit)}
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
      )}
    </ScrollView>
  );
}
