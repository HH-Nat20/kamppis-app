import { Photo } from "./Photo";
import { Lifestyle } from "./Enums/LifestyleEnum";
import { Cleanliness } from "./Enums/CLeanlinessEnum";
import { Gender } from "./Enums/GenderEnum";
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  userId: number;
  maxRent: "LOW" | "MEDIUM" | "HIGH";
  lifestyle: Lifestyle[];
  cleanliness: Cleanliness;
  bio?: string;
  minAgePreference?: number;
  maxAgePreference?: number;
  preferredGender?: Gender;
  preferredLocations?: string[];
  userPhotos?: Photo[];
}
