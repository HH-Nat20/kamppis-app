/**
 * CREDIT: Most of this file is taken from the Siba project
 * presented in the Ohjelmointikehityksen teknologiat course.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

export const getBaseUrl = () => {
  return "https://kamppis.hellmanstudios.fi/api"; // TODO: Change logic using env variables later
  // return "http://10.0.2.2:8080/api";
};

export const baseUrl = getBaseUrl();

// Function to get token from AsyncStorage
const getSessionToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem("jwtToken");
  } catch (error) {
    console.error("Error retrieving session token:", error);
    return null;
  }
};

// Helper function to send requests
const sendRequest = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: object,
  noAuth: boolean = false
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
    headers: noAuth ? {} : headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  // console.log("Sending request to", `${baseUrl}/${url}`);
  // console.log("Options", options);

  return fetch(`${baseUrl}/${url}`, options);
};

export const uploadRequest = async (url: string, formData: FormData) => {
  const token = await getSessionToken();

  /**
   * TODO: Currently this is not a very secure way to upload images.
   * Consider how to handle logged user and their images.
   * A /images/{userId} endpoint might be vulnerable to attacks if
   * malicious users make requests to other users' endpoints.
   *
   */

  console.log("Sending request to", `${baseUrl}/${url}`);
  console.log("Body:", formData);
  // console.log("Token", token);

  const headers: Record<string, string> = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };

  const options: RequestInit = {
    method: "POST",
    headers,
    body: formData,
  };

  /* Working example with imgbb */
  //const response = await fetch(`https://api.imgbb.com/1/upload?expiration=600&key=a5ea20879de8d531b4be0f87a0bee30e`, options);

  /** Actual Backend Request */
  const response = await fetch(`${baseUrl}/${url}`, options);
  console.log("Response", response);

  return response;
};

// CRUD functions
export const get = async (url: string) => sendRequest(url, "GET");

export const getWithoutAuth = async (url: string) =>
  sendRequest(url, "GET", undefined, true);

export const create = async (url: string, newObject: object) =>
  sendRequest(url, "POST", newObject);

export const update = async (url: string, updatedObject: object) =>
  sendRequest(url, "PUT", updatedObject);

export const remove = async (url: string) => sendRequest(url, "DELETE");
