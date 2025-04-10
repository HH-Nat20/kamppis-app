import { StyleSheet } from "react-native";
import colors from "./colors";

const base = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    //paddingHorizontal: 10,
    paddingTop: 20,
    color: colors.text,
  },
  scrollContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.background,
    color: colors.text,
    paddingBottom: 60,
  },
  scrollContent: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    color: colors.text,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.textLight,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    color: colors.text,
  },
  status: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  ok: {
    color: colors.success,
  },
  failed: {
    color: colors.danger,
  },
  info: {
    position: "absolute",
    top: 70,
    left: 20,
    fontSize: 20,
    color: colors.text,
  },
});

export default base;
