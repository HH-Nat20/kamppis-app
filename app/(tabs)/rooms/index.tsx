import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { useRoomsDrawer } from "@/contexts/RoomsDrawerContext";
import RoomsDrawerLayout from "@/components/custom/RoomsDrawerLayout";

import Container from "@/components/common/Container";

const RoomsScreen: React.FC = () => {
  const { isOpen, closeDrawer } = useRoomsDrawer();

  return (
    <RoomsDrawerLayout>
      <Container>
        <View style={styles.container}>
          <Text style={styles.title}>
            Looking for roommates for a free room?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Create a Flat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Join Flat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    </RoomsDrawerLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default RoomsScreen;
