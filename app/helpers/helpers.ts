import { Photo } from "../types/photo";

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

const getProfilePicture = (photos?: Photo[]): string => {
  let url =
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

  if (photos) {
    console.log("Found some photos...", photos);
    const profilePicture = photos.find((photo) => photo.isProfilePhoto);
    if (profilePicture) {
      console.log("Found a profile picture...", profilePicture);
      url = profilePicture.name;
    }
  }

  return url;
};

export { countAge, formatDate, getProfilePicture };
