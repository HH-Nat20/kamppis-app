import React, { useState } from "react";

import { useUser } from "@/contexts/UserContext";

import Container from "@/components/common/Container";

import { FlashList } from "@shopify/flash-list";

import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalBackdrop,
} from "@/components/ui/modal";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";

import ConfirmationDialog from "@/components/common/ConfirmationDialog";

import dao from "@/api/dao";

import { router, useNavigation } from "expo-router";
import * as Linking from "expo-linking";

import Toast from "react-native-toast-message";

const PrivacySettingsScreen = () => {
  const { user } = useUser();

  const navigation = useNavigation();

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  type Operation = {
    id: number;
    name: string;
    description: string;
    action: () => void;
  };

  const operations: Operation[] = [
    {
      id: 1,
      name: "Change Password",
      description: "Change your account password",
      action: () => {
        setShowPasswordModal(true);
      },
    },
    {
      id: 2,
      name: "Delete Account",
      description: "Permanently delete your account",
      action: () => {
        setShowDeleteConfirmation(true);
      },
    },
    {
      id: 3,
      name: "Copy of Data",
      description: "View the data we have collected about you",
      action: () => {
        if (user?.id) {
          const url = `https://kamppis.hellmanstudios.fi/api/users/${user.id}/copy`;
          Linking.openURL(url).catch((err) =>
            console.error("An error occurred", err)
          );
        }
      },
    },
  ];

  const handleDeleteAccount = () => {
    const userId = user?.id;

    dao.removeUser(userId!).then((response) => {
      if (response) {
        Toast.show({
          type: "success",
          text1: "Account Deleted",
          text2: "Your account has been successfully deleted.",
        });
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" as never }],
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "There was an error deleting your account.",
        });
        setShowDeleteConfirmation(false);
      }
    });
  };

  return (
    <>
      <Container>
        <View className="flex-1 items-center justify-center">
          <Text>Privacy Settings Screen</Text>
          <Text>User ID: {user?.id}</Text>
          <Text>User Name: {user?.firstName}</Text>
        </View>
        <FlashList
          data={operations}
          keyExtractor={(item: Operation) => item.id.toString()}
          renderItem={({ item }: { item: Operation }) => (
            <Pressable onPress={item.action}>
              <View className="p-4 border-b border-gray-200">
                <Text className="text-lg font-semibold">{item.name}</Text>
                <Text className="text-gray-500">{item.description}</Text>
              </View>
            </Pressable>
          )}
          estimatedItemSize={50}
          className="w-full"
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </Container>

      <ConfirmationDialog
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDeleteAccount}
        title="Are you sure you want to delete your account?"
        description="This cannot be undone. All your data will be permanently deleted."
        confirmText="Delete"
        cancelText="Cancel"
      />

      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Text className="text-lg font-semibold">Change Password</Text>
          </ModalHeader>
          <ModalBody>
            <Text className="text-sm text-gray-500 mb-2">
              Please enter your current password:
            </Text>
            <Input>
              <InputField
                placeholder="Enter current password"
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry
              />
            </Input>
            <Text className="text-sm text-gray-500 mb-2">
              Enter your new password below:
            </Text>
            <Input>
              <InputField
                placeholder="Enter new password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />
            </Input>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              onPress={() => setShowPasswordModal(false)}
              className="mr-2"
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              onPress={() => {
                if (!user?.id || !newPassword) return;
                dao
                  .changePassword(user.id, oldPassword, newPassword)
                  .then(() => {
                    Toast.show({
                      type: "success",
                      text1: "Password changed",
                    });
                    setNewPassword("");
                    setShowPasswordModal(false);
                  })
                  .catch(() => {
                    Toast.show({
                      type: "error",
                      text1: "Error changing password",
                    });
                  });
              }}
            >
              <ButtonText>Save</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PrivacySettingsScreen;
