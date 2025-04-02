import { UserProfile } from "./UserProfile";
import { RoomProfile } from "./RoomProfile";
import { Gender } from "../enums/GenderEnum";
import { LookingFor } from "../enums/LookingForEnum";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: [number, number, number];
  age: number;
  gender: Gender;
  lookingFor: LookingFor;
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
