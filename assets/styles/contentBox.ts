import { StyleSheet } from "react-native";

import { colorSet } from "./colors";

const contentBox = StyleSheet.create({
  contentBox: {
    flex: 1,
    height: "auto",
    backgroundColor: colorSet.darkBlue,
    color: colorSet.white,
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    width: "90%",
  },
});

export default contentBox;
