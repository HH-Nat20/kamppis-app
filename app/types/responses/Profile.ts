import { Photo } from "./Photo";

export interface Profile {
  type: "userProfile" | "roomProfile";
  id: string;
  bio: string;
  photos?: Photo[];
}
