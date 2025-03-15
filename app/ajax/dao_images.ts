import { uploadRequest } from "./request";

const ENDPOINT = "images";

/**
 * Post an image to the server
 */
export const postImage = async (formData: FormData) => {
    const response = await uploadRequest(ENDPOINT, formData);

    if (!response.ok) {
        throw new Error("Failed to upload image");
    }

    return response.json();
}