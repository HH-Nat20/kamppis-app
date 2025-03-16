import React, { useState, useEffect } from "react";
import { 
  View, Text, Button, TouchableOpacity, ActionSheetIOS, Modal, FlatList, Pressable, Platform 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getUsers } from "../ajax/dao_users";
import { MatchUser } from "../types/Match";
import styles from "../ui/styles";
import { useUser } from "../contexts/UserContext";
import { HomeStackParamList } from "../navigation/HomeStackNavigator";

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, "Home">;

export default function LoginScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<MatchUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserLabel, setSelectedUserLabel] = useState<string>("Select a user");
  const [isAndroidPickerVisible, setAndroidPickerVisible] = useState<boolean>(false);
  const { changeUser } = useUser();

  useEffect(() => {
    getUsers().then((users) => {
      console.log("Users", users);
      setUsers(users);
      setLoading(false);
    });
  }, []);

  // iOS User Picker
  const openUserPickerIOS = () => {
    if (users.length === 0) return;

    const options = users.map((user) => user.email);
    options.push("Cancel");

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: options.length - 1,
      },
      (buttonIndex) => {
        if (buttonIndex < users.length) {
          setSelectedUserId(users[buttonIndex].id.toString());
          setSelectedUserLabel(users[buttonIndex].email);
        }
      }
    );
  };

  // Android User Picker
  const openUserPickerAndroid = () => {
    setAndroidPickerVisible(true);
  };

  const selectUserAndroid = (user: MatchUser) => {
    setSelectedUserId(user.id.toString());
    setSelectedUserLabel(user.email);
    setAndroidPickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.info}>Select a user to login</Text>

      {/* Button to Open Picker (iOS/Android) */}
      <TouchableOpacity 
        style={styles.pickerInput} 
        onPress={Platform.OS === "ios" ? openUserPickerIOS : openUserPickerAndroid}
      >
        <Text style={styles.pickerItem}>{selectedUserLabel}</Text>
      </TouchableOpacity>

      {/* Android Modal Picker */}
      {Platform.OS === "android" && (
        <Modal
          visible={isAndroidPickerVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setAndroidPickerVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select a User</Text>
              <FlatList
                data={users}
                keyExtractor={(user) => user.id.toString()}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.modalItem}
                    onPress={() => selectUserAndroid(item)}
                  >
                    <Text>{item.email}</Text>
                  </Pressable>
                )}
              />
              <Button title="Cancel" onPress={() => setAndroidPickerVisible(false)} />
            </View>
          </View>
        </Modal>
      )}

      {/* Login Button */}
      <Button
        title="Login"
        onPress={() => {
          if (!selectedUserId) {
            console.warn("No user selected");
            return;
          }
          const selectedUser = users.find((user) => user.id.toString() === selectedUserId);
          if (!selectedUser) {
            console.error("Selected user not found");
            return;
          }
          console.log("Login as", selectedUser);
          changeUser(selectedUser);

          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        }}
      />
    </View>
  );
}