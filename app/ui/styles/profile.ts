import { StyleSheet } from "react-native";
import colors from "../colors";

const profile = StyleSheet.create({
  goBackButton: {
    position: "absolute",
    top: 10,
    left: 20,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
    color: colors.textLight,
    zIndex: 1,
  },
  portraitSwiper: {
    width: "100%",
    height: 250,
    backgroundColor: "transparent",
  },
  portraitContainer: {
    width: "100%",
    backgroundColor: "transparent",
    padding: 0,
  },
  portrait: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderColor: colors.primary,
    borderWidth: 5,
    borderRadius: 8,
  },
  profileInfo: {
    marginTop: 40,
    width: "100%",
    padding: 20,
    backgroundColor: colors.background,
    color: colors.text,
  },
  bioText: {
    fontSize: 16,
    color: colors.text,
  },

  tooltip: {
    position: "absolute",
    top: 30,
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  tooltipText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    maxWidth: 200,
  },
});

export default profile;