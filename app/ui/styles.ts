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
    backgroundColor: "white",
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
  subtitle: { 
    fontSize: 18, marginTop: 10 
  },
  status: {
    fontSize: 20, fontWeight: "bold", marginTop: 5 
  },
  ok: { 
    color: "green" 
  },
  failed: { 
    color: "red" 
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
