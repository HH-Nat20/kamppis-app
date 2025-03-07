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
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Lifestyle, LifestyleDescriptions } from "../types/enums/LifestyleEnum";
import {
  Cleanliness,
  CleanlinessDescriptions,
} from "../types/enums/CLeanlinessEnum";

export default function App({}) {
  const [saved, setSaved] = React.useState(Boolean);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [lifestyle, setLifestyle] = useState<Lifestyle>(Lifestyle.EARLY_BIRD);
  const [cleanliness, setCleanliness] = useState<Cleanliness>(Cleanliness.TIDY);
  const [maxRent, setMaxRent] = useState("");
  const [city, setCity] = useState("");

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Text style={styles.info}>Profile</Text>
      <View style={styles.profileData}>
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
          <Picker.Item label="Male" value="male" color="black" />
          <Picker.Item label="Female" value="female" color="black" />
          <Picker.Item label="Other" value="other" color="black" />
          <Picker.Item
            label="Prefer not to say"
            value="not_important"
            color="black"
          />
        </Picker>
        <Text style={styles.label}>Lifestyle:</Text>
        <Picker
          selectedValue={lifestyle}
          style={styles.pickerInput}
          onValueChange={(itemValue) => setLifestyle(itemValue as Lifestyle)}
        >
          {Object.values(Lifestyle).map((lifestyle) => (
            <Picker.Item
              key={lifestyle}
              label={LifestyleDescriptions[lifestyle]}
              value={lifestyle}
            />
          ))}
        </Picker>
        <Text>Selected: {lifestyle}</Text>
        <Text style={styles.label}>Cleanliness:</Text>
        <Picker
          style={styles.pickerInput}
          selectedValue={cleanliness}
          onValueChange={(itemValue) =>
            setCleanliness(itemValue as Cleanliness)
          }
        >
          {Object.values(Cleanliness).map((level) => (
            <Picker.Item
              key={level}
              label={CleanlinessDescriptions[level]}
              value={level}
            />
          ))}
        </Picker>
        <Text>Selected: {cleanliness}</Text>
        <Text style={styles.label}>Preferred location:</Text>
        <Picker
          selectedValue={city}
          style={styles.pickerInput}
          onValueChange={(itemValue) => setCity(itemValue)}
        >
          <Picker.Item label="Espoo" value="espoo" color="black" />
          <Picker.Item label="Helsinki" value="helsinki" color="black" />
          <Picker.Item label="Vantaa" value="vantaa" color="black" />
        </Picker>
        <Text style={styles.label}>Maximum rent:</Text>
        <TextInput
          style={styles.input}
          placeholder="Maximum rent you can afford"
          keyboardType="numeric"
          value={maxRent}
          onChangeText={setMaxRent}
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
    </ScrollView>
  );
}
