import { StyleSheet } from "react-native";
import colors from "../colors";

const profile = StyleSheet.create({
  goBackButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
    color: colors.textLight,
  },
  portrait: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  }
});

export default profile;