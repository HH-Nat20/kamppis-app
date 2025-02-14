import { Photo } from "./photo";
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: [number, number, number];
  gender?: "MALE" | "FEMALE" | "OTHER" | "NOT_IMPORTANT";
  user?: { email: string; id: number };
  userHabits?: string[]; // Perhaps number[] (habit ids) ?
  userInterests?: string[]; // Perhaps number[] (interest ids) ?
  bio?: string;
  minAgePreference?: number;
  maxAgePreference?: number;
  preferredGender?: "MALE" | "FEMALE" | "OTHER" | "NOT_IMPORTANT";
  locations?: string[];
  userPhotos?: Photo[];
}
