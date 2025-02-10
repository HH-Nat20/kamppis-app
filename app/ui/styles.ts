import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
    paddingBottom: 20,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  cardText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333333",
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
  definitionBox: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
  },
  definition: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  definitionText: {
    fontSize: 16,
    color: "#333333",
  },
  definitionValue: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "bold",
  },
});

export default styles;
