import { StyleSheet, Dimensions } from "react-native";
import colors from "./colors";

const { width } = Dimensions.get("window");
const itemMargin = 10;
const numColumns = 2;
const itemWidth = (width - (numColumns + 1) * itemMargin) / numColumns;

const matches = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textLight,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginHorizontal: itemMargin / 2,
  },
  matchItem: {
    width: itemWidth,
    height: itemWidth,
    margin: itemMargin / 2,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  placeholder: {
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: colors.textDark,
    fontSize: 14,
  },
  name: {
    color: colors.textLight,
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: colors.textLight,
    fontSize: 16,
    textAlign: "center",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default matches;
