import { Photo } from "./Photo";
import { Lifestyle } from "./enums/LifestyleEnum";
import { Cleanliness } from "./enums/CLeanlinessEnum";
import { Gender } from "./enums/GenderEnum";
import { Location } from "./enums/LocationEnum";
import { MatchUser } from "./Match";
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  age?: number;
  gender: Gender;
  userId: number;
  maxRent: "LOW" | "MID" | "HIGH";
  lifestyle: Lifestyle[];
  cleanliness: Cleanliness;
  bio?: string;
  minAgePreference?: number;
  maxAgePreference?: number;
  preferredGenders: Gender[];
  preferredLocations: Location[];
  userPhotos?: Photo[];
}

export type LoggedInUser = MatchUser & User;
