import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getUsers } from "../ajax/dao_users";
import { MatchUser } from "../types/Match";
import { Picker } from "@react-native-picker/picker";
import { Button, View, Text } from "react-native";
import styles from "../ui/styles";
import { useUser } from "../contexts/UserContext";
import { HomeStackParamList } from "../navigation/HomeStackNavigator";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  "Home"
>;

export default function LoginScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<MatchUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<MatchUser | null>(null);
  const { setUser } = useUser();

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
      setLoading(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.info}>Select a user to login</Text>
      <Picker
        selectedValue={selectedUser}
        style={styles.pickerInput}
        onValueChange={(itemValue) => setSelectedUser(itemValue)}
      >
        {users.map((user) => (
          <Picker.Item
            key={user.id}
            label={user.email}
            value={user}
            style={styles.pickerItem}
          />
        ))}
      </Picker>
      <Button
        title="Login"
        onPress={() => {
          if (!selectedUser) {
            console.warn("No user selected");
            return;
          }
          console.log("Login as", selectedUser);
          setUser(selectedUser);
          navigation.navigate("Home"); // Navigate to Home after login
        }}
      />
    </View>
  );
}
