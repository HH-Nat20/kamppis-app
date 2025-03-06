import { StyleSheet } from "react-native";

const form = StyleSheet.create({
  info: {
    position: "absolute",
    top: 70,
    left: 20,
    fontSize: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  saveButton: {
    width: 150,
    height: 50,
    backgroundColor: "blue",
    borderRadius: 10,
    position: "absolute",
    top: 10,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButton: {
    width: 150,
    height: 50,
    backgroundColor: "#ccc",
    borderRadius: 10,
    position: "absolute",
    bottom: 10,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  pickerInput: {
    borderRadius: 8,
    marginTop: 5,
    height: 60,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  pickerItem: {
    color: "black",
  },
});

export default form;
