import { Profile } from "./Profile";
import { Gender } from "../enums/GenderEnum";
import { Preferences } from "./Preferences";
import { MatchUser } from "../Match";

interface User {
  id: number;
  email: string;
  status: "ACTIVE" | "INACTIVE";
  isOnline: boolean;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number; // Make sure this comes in the response
  gender: Gender;
  profile: Profile;
  preferences: Preferences;
}

type LoggedInUser = MatchUser & User;

export { User, LoggedInUser };
