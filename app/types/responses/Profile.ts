import { Photo } from "./Photo";

export interface Profile {
  id: string;
  bio: string;
  photos?: Photo[];
}
