import React from "react";
import { Link, router } from "expo-router";
import { Platform, Pressable, StyleSheet, Text } from "react-native";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

export default function Modal() {
  const isPresented = router.canGoBack();

  return (
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000040",
      }}
    >
      {/* Dismiss modal when pressing outside */}
      {isPresented ? (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => router.back()}
        />
      ) : (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => router.push("/")}
        />
      )}

      {/* Modal content */}

      <Animated.View
        entering={SlideInDown}
        style={{
          width: "95%",
          height: "80%",
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white", // change to reflect dark/light mode
        }}
      >
        <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
          Modal Screen
        </Text>

        {/* Dismiss button on top right */}
        {isPresented && (
          <Link
            style={{
              padding: 10,
              position: "absolute",
              top: 5,
              right: 10,
              fontWeight: "bold",
            }}
            href="../"
          >
            X
          </Link>
        )}
      </Animated.View>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </Animated.View>
  );
}
