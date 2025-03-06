import { StyleSheet } from "react-native";

const swipe = StyleSheet.create({
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
  profileData: {
    flex: 1,
    padding: 10,
    marginTop: 100,
  },
});

export default swipe;
