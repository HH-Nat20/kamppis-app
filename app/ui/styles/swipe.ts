import { StyleSheet } from "react-native";
import colors from "../colors";

const swipe = StyleSheet.create({
  done: {
    textAlign: "center",
    fontSize: 30,
    color: colors.textLight,
    backgroundColor: "transparent",
  },
  profileData: {
    flex: 1,
    padding: 10,
    marginTop: 100,
  },
});

export default swipe;
