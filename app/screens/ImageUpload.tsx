import React, { useState } from "react";

import {
  View,
  Text,
  Button,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";

import Toast from "react-native-toast-message";

import * as ImagePicker from "expo-image-picker";

import { useUser } from "../contexts/UserContext";

import dao from "../ajax/dao";

import styles from "../ui/styles";

const ImageUpload = () => {
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

  const [responseImageUrl, setResponseImageUrl] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0] as Image);
    }
  };

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
      const response = await dao.postImage(formData, user?.id || 1);
      console.log("Image uploaded", response);
      setUploadSuccess(true);
      setUploading(false);
      setResponseImageUrl(response?.imageUrl);
      refreshUser();
      Toast.show({
        type: "success",
        text1: "Image Uploaded",
        text2: `A new image uploaded soccessfully 🖼️`,
      });
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
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <View>
          <Image source={{ uri: image.uri }} style={styles.thumbnail} />
          <Button title="Upload image" onPress={() => uploadImage()} />
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
          {responseImageUrl && (
            <View>
              <Text style={styles.text}>Image URL:</Text>
              <Text style={styles.text}>{responseImageUrl}</Text>
              <Image
                source={{ uri: responseImageUrl }}
                style={styles.thumbnail}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default ImageUpload;
