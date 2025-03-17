import { Profile } from "./Profile";
import { Cleanliness } from "../enums/CLeanlinessEnum";
import { Lifestyle } from "../enums/LifestyleEnum";

export interface UserProfile extends Profile {
  cleanliness: Cleanliness;
  lifestyle: Lifestyle[];
}
