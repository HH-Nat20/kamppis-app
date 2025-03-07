import { View, Text, ActivityIndicator } from "react-native";
import styles from "../ui/styles";
import React, { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { User } from "../types/User";
import dao from "../ajax/dao";

export default function ProfileScreen() {
  const { user } = useUser();
  const [myProfile, setMyProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfile = async () => {
    if (!user) {
      console.warn("No user found");
      setLoading(false);
      return;
    }
    const userProfile = await dao.getUserProfile(user.id);
    setMyProfile(userProfile);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Text style={styles.text}>Name: {myProfile?.firstName}</Text>
      )}
    </View>
  );
}
