import { UserProfile } from "./UserProfile";
import { RoomProfile } from "./RoomProfile";
import { Gender } from "../enums/GenderEnum";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: Gender;
  status: "ACTIVE" | "INACTIVE";
  isOnline: boolean;
  //dateOfBirth: string;
  matchIds: number[]; // TODO: Make sure this comes from the backend
  userProfile: UserProfile;
  roomProfiles: RoomProfile[];
}

interface ShortUser {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  isOnline: boolean;
}

export { User, ShortUser };
