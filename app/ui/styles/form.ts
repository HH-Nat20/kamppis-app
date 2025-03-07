import { StyleSheet } from "react-native";
import colors from "../colors";

const form = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    color: colors.textLight,
  },
  input: {
    height: 40,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 5,
    color: colors.textLight,
  },
  saveButton: {
    width: 150,
    height: 50,
    backgroundColor: colors.success,
    borderRadius: 10,
    top: 10,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    color: colors.textLight,
  },
  nextButton: {
    width: 150,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 10,
    top: 10,
    left: 20,
    alignItems: "center",
    justifyContent: "center",
    color: colors.textLight,
  },
  buttonText: {
    color: colors.textLight,
    fontSize: 24,
  },
  pickerInput: {
    borderColor: colors.border,
    borderWidth: 1,
    color: colors.text,
    borderRadius: 8,
    marginTop: 5,
    height: 60,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  pickerItem: {
    color: colors.black,
  },
  selected: {
    color: colors.info,
    fontSize: 14,
  },
  radioButton: {
    width: "48%", // Each takes almost half of the row
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    alignItems: "center",
  },
  selectedRadio: { backgroundColor: "#ddd" },
  radioGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
});

export default form;
