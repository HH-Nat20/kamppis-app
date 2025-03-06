import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const itemMargin = 10;
const numColumns = 2;
const itemWidth = (width - (numColumns + 1) * itemMargin) / numColumns;

const matches = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
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
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#aaa",
    fontSize: 14,
  },
  name: {
    color: "#fff",
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
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default matches;