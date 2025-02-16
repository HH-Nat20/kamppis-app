import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Determine API base URL dynamically
export const getBaseUrl = () => {
  if (Platform.OS === "web") {
    return "https://kamppis.hellmanstudios.fi/api"; // Use full URL for web testing
  }

  if (__DEV__) {
    return "http://10.0.2.2:8080/api"; // Android Emulator (or use `192.168.x.x` for real devices)
  }

  return "https://kamppis.hellmanstudios.fi/api"; // Production API
};

export const baseUrl = getBaseUrl();

// Function to get token from AsyncStorage
const getSessionToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("sessionToken");
  } catch (error) {
    console.error("Error retrieving session token:", error);
    return null;
  }
};

// Helper function to send requests
const sendRequest = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: object
) => {
  const token = await getSessionToken();

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  return fetch(`${baseUrl}${url}`, options);
};

// CRUD functions
export const get = async (url: string) => sendRequest(url, "GET");

export const create = async (url: string, newObject: object) =>
  sendRequest(url, "POST", newObject);

export const update = async (url: string, updatedObject: object) =>
  sendRequest(url, "PUT", updatedObject);

export const remove = async (url: string) => sendRequest(url, "DELETE");
