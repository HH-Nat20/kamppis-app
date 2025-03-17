import { uploadRequest } from "./request";

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
