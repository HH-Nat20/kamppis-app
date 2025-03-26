import { Photo } from "./Photo";

export interface Profile {
  type: "userProfile" | "roomProfile";
  id: number;
  bio: string;
  photos?: Photo[];
}
