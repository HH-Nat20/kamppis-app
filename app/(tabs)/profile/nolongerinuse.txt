import React, { useState, useEffect } from "react";

import { View, Text, Button, Platform, ActivityIndicator } from "react-native";

import Toast from "react-native-toast-message";

import Portrait from "@/components/common/Portrait";

import * as ImagePicker from "expo-image-picker";

import { useUser } from "@/contexts/UserContext";

import { useLocalSearchParams, router } from "expo-router";

import dao from "@/api/dao";

import styles from "@/assets/styles/styles";

const ImageUpload = () => {
  const { mode } = useLocalSearchParams() ?? "gallery";
  const { profileId } = useLocalSearchParams() ?? "0";

  type Image = {
    uri: string;
    width: number;
    height: number;
    fileName: string;
    mimeType: string;
  };

  const { user, refreshUser } = useUser();

  const [image, setImage] = useState<Image | null>(null);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const pickImage = async () => {
    let result;

    if (mode === "camera") {
      const cameraPermission =
        await ImagePicker.requestCameraPermissionsAsync();
      if (!cameraPermission.granted) {
        Toast.show({
          type: "error",
          text1: "Permission Denied",
          text2: "Camera access is required.",
        });
        router.back();
        return;
      }

      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (result.canceled) {
      router.back();
      return;
    }

    setImage(result.assets[0] as Image);
  };

  useEffect(() => {
    pickImage();
  }, []);

  const uploadImage = async () => {
    if (!image) {
      return;
    }

    setUploading(true);
    setUploadSuccess(false);
    setUploadError(null);

    console.log("Uploading image", image);

    const formData = new FormData();

    const file = {
      uri:
        Platform.OS === "android"
          ? image?.uri
          : image?.uri.replace("file://", ""),
      type: image?.mimeType || "image/jpeg",
      name: image?.fileName || "image.jpg",
    } as any;

    formData.append("image", file);

    try {
      const response = await dao.postImage(formData, Number(profileId));
      console.log("Image uploaded", response);
      setUploadSuccess(true);
      setUploading(false);
      refreshUser();
      Toast.show({
        type: "success",
        text1: "Image Uploaded",
        text2: `A new image uploaded soccessfully 🖼️`,
      });
      router.back();
    } catch (error) {
      setUploading(false);
      setUploadError("Failed to upload image");
      Toast.show({
        type: "error",
        text1: "Upload Failed",
        text2: `Failed to upload image 🚫`,
      });
      console.error("Error uploading image", error);
    }
  };

  return (
    <View style={styles.container}>
      {/*<Button title="Pick an image from camera roll" onPress={pickImage} />*/}
      {image && (
        <View>
          <Portrait photo={image.uri} />
          <View
            style={{
              marginTop: 20,
              gap: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Button title="Cancel" onPress={() => router.back()} />
            <Button title="Upload image" onPress={() => uploadImage()} />
          </View>
          {uploading && (
            <View>
              <Text style={styles.text}>Uploading image...</Text>
              <ActivityIndicator />
            </View>
          )}
          {uploadSuccess && (
            <Text style={styles.text}>Image uploaded successfully!</Text>
          )}
          {uploadError && <Text style={styles.text}>{uploadError}</Text>}
        </View>
      )}
    </View>
  );
};

export default ImageUpload;
