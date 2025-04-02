import { StyleSheet } from "react-native";
import colors from "./colors";

const upload = StyleSheet.create({
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderColor: colors.primary,
    borderWidth: 5,
    borderRadius: 8,
  },
});

export default upload;
