import { Photo } from "./Photo";
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth?: [number, number, number];
  age?: number;
  gender?: "MALE" | "FEMALE" | "OTHER" | "NOT_IMPORTANT";
  user?: { email: string; id: number };
  userHabits?: number[];
  userInterests?: number[]; 
  bio?: string;
  minAgePreference?: number;
  maxAgePreference?: number;
  preferredGender?: "MALE" | "FEMALE" | "OTHER" | "NOT_IMPORTANT";
  locations?: string[];
  userPhotos?: Photo[];
}
