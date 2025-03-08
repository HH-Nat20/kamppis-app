import { Photo } from "./Photo";
import { Lifestyle } from "./enums/LifestyleEnum";
import { Cleanliness } from "./enums/CLeanlinessEnum";
import { Gender } from "./enums/GenderEnum";
import { Location } from "./enums/LocationEnum";
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  age?: number;
  gender: Gender;
  userId: number;
  maxRent: "LOW" | "MEDIUM" | "HIGH";
  lifestyle: Lifestyle[];
  cleanliness: Cleanliness;
  bio?: string;
  minAgePreference?: number;
  maxAgePreference?: number;
  preferredGender?: Gender;
  preferredLocations: Location[];
  userPhotos?: Photo[];
}
