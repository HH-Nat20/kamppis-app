import { Photo } from "@/types/responses/Photo";
import { User } from "@/types/responses/User";
import { uploadRequest, remove, update } from "./request";

const ENDPOINT = "images";

/**
 * Post an image to the server
 */
export const postImage = async (formData: FormData, profileId: number) => {
  const response = await uploadRequest(`${ENDPOINT}/${profileId}`, formData); // Not the most secure way to upload images. Handle userId in a more secure way.

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  return response.json();
};

/**
 * Delete an image from the server
 */
export const deleteImage = async (authUser: User | undefined, photo: Photo) => {
  if (!authUser) {
    throw new Error("User is not authenticated");
  }
  console.log("Deleting image", photo.id);
  const response = await remove(`${ENDPOINT}/${authUser!.id}/${photo.id}`); // TODO: userId or profileId?
  console.log("Response", response);
  if (!response.ok) {
    throw new Error("Failed to delete image");
  }

  return response.json();
};

/**
 * Set ProfilePhoto State
 */
export const putImage = async (
  authUser: User | undefined,
  photo: Photo,
  isProfilePhoto: boolean
) => {
  if (!authUser) {
    throw new Error("User is not authenticated");
  }
  const profileId = authUser.userProfile.id;
  console.log(`setting image ${photo.id} to isProfilePhoto=${isProfilePhoto}`);
  const response = await update(
    `${ENDPOINT}/${profileId}/${photo.id}?isProfilePhoto=${isProfilePhoto}`, // TODO: get profileId from somewhere else
    {} // Empty body
  );
  console.log("Response", response);
  if (!response.ok) {
    throw new Error("Failed to set image");
  }

  return response.json();
};
