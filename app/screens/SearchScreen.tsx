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



export default function App({}) {

 

   

  return (
    <View style={styles.container}>
        
    <Text style={styles.normaltext}>Search</Text>
    

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  normaltext: {
    fontSize: 20,
  },
  inputs: {
    width: "80%",
  },
  listitems: {
    backgroundColor: "lightblue",
    borderRadius: 20,
    padding: 10,
    margin: 5,
  },
});
