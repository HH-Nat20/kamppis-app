import { StyleSheet } from "react-native";
import colors from "../colors";

const card = StyleSheet.create({
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

  tagArea: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  tag: {
    backgroundColor: "#f2f2f2",
    color: "#f1f1f1",
    padding: 5,
    borderRadius: 5,
    margin: 5,
  },
});

export default card;
