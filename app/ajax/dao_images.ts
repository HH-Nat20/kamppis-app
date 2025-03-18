import { Photo } from "../types/Photo";
import { LoggedInUser } from "../types/User";
import { uploadRequest, remove } from "./request";

const ENDPOINT = "images";

/**
 * Post an image to the server
 */
export const postImage = async (formData: FormData, userId: number) => {
  const response = await uploadRequest(`${ENDPOINT}/${userId}`, formData); // Not the most secure way to upload images. Handle userId in a more secure way.

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  return response.json();
};

/**
 * Delete an image from the server
 */
export const deleteImage = async (
  authUser: LoggedInUser | undefined,
  photo: Photo
) => {
  if (!authUser) {
    throw new Error("User is not authenticated");
  }
  console.log("Deleting image", photo.id);
  const response = await remove(`${ENDPOINT}/${authUser!.id}/${photo.id}`);
  console.log("Response", response);
  if (!response.ok) {
    throw new Error("Failed to delete image");
  }

  return response.json();
};
