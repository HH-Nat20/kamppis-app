import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "../ui/styles";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function App({}) {
  const [saved, setSaved] = React.useState(Boolean);
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [lifestyle, setLifestyle] = useState("");
  const [interest, setInterest] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.info}>Edit info</Text>
      <View style={styles.profileData}>
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
        <Text style={styles.label}>Gender:</Text>
        <Picker
          selectedValue={gender}
          style={styles.pickerInput}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Male" value="male" style={styles.pickerItem} />
          <Picker.Item
            label="Female"
            value="female"
            style={styles.pickerItem}
          />
          <Picker.Item label="Other" value="other" style={styles.pickerItem} />
        </Picker>
        <Text style={styles.label}>Lifestyle:</Text>
        <TextInput
          style={styles.input}
          placeholder="Drinking, Smoking... etc."
          value={lifestyle}
          onChangeText={setLifestyle}
        />
        <Text style={styles.label}>Interests:</Text>
        <TextInput
          style={styles.input}
          placeholder="Add my interests"
          value={interest}
          onChangeText={setInterest}
        />
      </View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => setSaved(true)}
      >
        <Text style={{ color: "white", fontSize: 25 }}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => setSaved(true)}
      >
        <Text style={{ color: "black", fontSize: 25 }}>Next</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}
