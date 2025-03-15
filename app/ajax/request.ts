import AsyncStorage from "@react-native-async-storage/async-storage";

export const getBaseUrl = () => {
  return "https://kamppis.hellmanstudios.fi/api"; // TODO: Change logic using env variables later
  // return "http://10.0.2.2:8080/api";
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

export const uploadRequest = async (url: string, formData: FormData) => {
  //const token = await getSessionToken();

  console.log("Sending request to", `${baseUrl}/${url}`);
  console.log("Body:", formData);
  //console.log("Token", token);
  

  const headers: Record<string, string> = {
    "Content-Type": "multipart/form-data",
    //Authorization: `Bearer ${token}`,
  };

  const options: RequestInit = {
    method: "POST",
    headers,
    body: formData,
  };

  const response = await fetch(`https://api.imgbb.com/1/upload?expiration=600&key=a5ea20879de8d531b4be0f87a0bee30e`, options);

  console.log("Response", response);

  //return fetch(`${baseUrl}${url}`, options);
  //return fetch('https://api.imgbb.com/1/upload?expiration=600&key=a5ea20879de8d531b4be0f87a0bee30e', options);

  return response;
};

// CRUD functions
export const get = async (url: string) => sendRequest(url, "GET");

export const create = async (url: string, newObject: object) =>
  sendRequest(url, "POST", newObject);

export const update = async (url: string, updatedObject: object) =>
  sendRequest(url, "PUT", updatedObject);

export const remove = async (url: string) => sendRequest(url, "DELETE");
