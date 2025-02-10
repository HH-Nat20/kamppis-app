import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  card: {
    flex: 1,
    position: "absolute",
    width: "100%",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "#E1E1E1",
  },
  cardPicture: {
    flex: 1,
    width: "100%",
    borderRadius: 4,
    height: 300,
  },
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
  subtitle: { fontSize: 18, marginTop: 10 },
  status: { fontSize: 20, fontWeight: "bold", marginTop: 5 },
  ok: { color: "green" },
  failed: { color: "red" },
  upperTab: {},
});

export default styles;
