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
    width: "80%",
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 5,
    paddingTop: 10,
    margin: 20,
  },
  definition: {
    color: colors.text,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 0,
    paddingBottom: 5
  },
  definitionText: {
    fontSize: 12,
    color: colors.info,
  },
  definitionValue: {
    fontSize: 12,
    color: colors.success,
  },

  tagArea: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 20
  },
  tag: {
    backgroundColor: colors.secondary,
    color: "#f1f1f1",
    padding: 5,
    borderRadius: 5,
    margin: 5,
  },
  cleanlinessTag: {
    backgroundColor: colors.primary,
    color: "#f1f1f1",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 0,
    marginRight: 15,
  }
});

export default card;
