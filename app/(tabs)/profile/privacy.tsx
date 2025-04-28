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
import ProfileDrawerLayout from "@/components/custom/ProfileDrawerLayout";

import dao from "@/api/dao";

import { router } from "expo-router";

import Toast from "react-native-toast-message";

import * as Clipboard from "expo-clipboard";

const PrivacySettingsScreen = () => {
  const { user } = useUser();

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
      name: "Copy of Data",
      description: "View the data we have collected about you",
      action: async () => {
        if (user?.id) {
          const userData = await dao.copyUserData(user.id);
          console.log("User Data: ", userData);
          if (!userData) {
            Toast.show({
              type: "error",
              text1: "Error",
              text2: "There was an error copying your data.",
            });
            return;
          } else {
            Clipboard.setStringAsync(JSON.stringify(userData)).then(() => {
              Toast.show({
                type: "success",
                text1: "Data Copied",
                text2: "Your data has been copied to the clipboard.",
              });
            });
          }
        }
      },
    },
    // {
    //   id: 2,
    //   name: "Change Password",
    //   description: "Change your account password",
    //   action: () => {
    //     setShowPasswordModal(true);
    //   },
    // },
    {
      id: 3,
      name: "Delete Account",
      description: "Permanently delete your account",
      action: () => {
        setShowDeleteConfirmation(true);
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
        router.replace("/login");
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
      <ProfileDrawerLayout>
        <Container>
          <View className="flex-1 items-center justify-center mt-4">
            <Text>Privacy Settings Screen</Text>
            <Text>User ID: {user?.id}</Text>
            <Text>User Name: {user?.firstName}</Text>
          </View>
          <FlashList
            data={operations}
            keyExtractor={(item: Operation) => item.id.toString()}
            renderItem={({ item }: { item: Operation }) => (
              <Pressable onPress={item.action}>
                <View
                  className={`p-4 border ${
                    item.name === "Delete Account"
                      ? "border-red-200 bg-red-50"
                      : "border-gray-200"
                  }`}
                >
                  <View className="flex-row items-center space-x-2">
                    {item.name === "Delete Account" && (
                      <Text className="text-red-500 text-xl">⚠️</Text>
                    )}
                    <Text
                      className={`text-lg font-semibold ${
                        item.name === "Delete Account" ? "text-red-600" : ""
                      }`}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <Text
                    className={`text-sm ${
                      item.name === "Delete Account"
                        ? "text-red-400"
                        : "text-gray-500"
                    }`}
                  >
                    {item.description}
                  </Text>
                </View>
              </Pressable>
            )}
            estimatedItemSize={50}
            className="w-full"
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </Container>
      </ProfileDrawerLayout>
      <ConfirmationDialog
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDeleteAccount}
        title="Are you sure you want to delete your account?"
        description="This cannot be undone. All your data will be permanently deleted."
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Not currently in use */}
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
