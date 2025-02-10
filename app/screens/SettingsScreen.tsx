import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from "react-native";
import styles from "../ui/styles";



export default function App({}) {

 

   

  return (
    <View style={styles.container}>
        
    <Text style={styles.text}>Settings</Text>
    

      <StatusBar style="auto" />
    </View>
  );
}
