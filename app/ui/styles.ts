import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  // Card component styles
  cardContainer: {
    position: "relative",
    flex: 1,
    top: -60,
    left: -20,
    zIndex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 8,
  },
  cardContent: {
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 15,
    borderRadius: 8,
  },
  definitionBox: {
    width: "100%",
  },
  definition: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  definitionText: {
    fontSize: 16,
    color: "#222",
  },
  definitionValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
  },

  // SwipeScreen styles
  text: {
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "transparent",
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    backgroundColor: "transparent",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
  },
  status: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  ok: {
    color: "green",
  },
  failed: {
    color: "red",
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
  profileData: {
    flex: 1,
    padding: 10,
    marginTop: 100,
  },
  pickerInput: {
    borderRadius: 8,
    marginTop: 5,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  pickerItem: {
    color: "black",
  },
});

export default styles;
