import { Photo } from "@/types/responses/Photo";

const countAge = (dateTuple?: [number, number, number]) => {
  if (!dateTuple || dateTuple.length !== 3) {
    return "Invalid age";
  }

  const [year, month, day] = dateTuple;
  const today = new Date();
  const birthDate = new Date(year, month - 1, day); // Months are 0-based in JS
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const formatDate = (dateTuple?: [number, number, number]) => {
  if (!dateTuple || dateTuple.length !== 3) {
    return "Invalid date";
  }

  const [year, month, day] = dateTuple;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
    2,
    "0"
  )}`;
};

const getProfilePicture = (photos?: Photo[]) =>
  photos?.find((photo) => photo.isProfilePhoto);

const getImageUrl = (
  photo: Photo | undefined,
  returnType: "original" | "thumbnail" | "resized" = "original",
  overrideProfileId: number = 0
): string => {
  let url =
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

  //console.log("Photo:", photo);
  //console.log("Return type:", returnType);
  //console.log("Override profile ID:", overrideProfileId);

  if (photo?.url) {
    if (photo.url.startsWith("http")) {
      url = photo.url; // If it's already a full URL, return as is
    } else {
      const originalExtensionMatch = photo.url.match(/-original\.(\w+)$/);
      const originalExtension = originalExtensionMatch
        ? originalExtensionMatch[1]
        : "jpg"; // Default to jpg if not found

      const modifiedName =
        returnType === "original"
          ? photo.url // Keep the original filename and extension
          : photo.url.replace(/-original\.\w+$/, `-${returnType}.jpg`); // Change to JPG for resized/thumbnail

      url = `https://hellmanstudios.fi/kamppis-images/${
        photo.profileId ?? overrideProfileId
      }/${modifiedName}`; // TODO: Replace with ENV variable
    }
  }

  //console.log("Returning IMAGE URL:", url);
  return url;
};

const formatCity = (city: string) => {
  if (!city || city.length < 0) return "Unknown City";
  return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
};

export { countAge, formatDate, getProfilePicture, getImageUrl, formatCity };
