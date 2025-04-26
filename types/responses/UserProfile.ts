import { Profile } from "./Profile";
import { Cleanliness } from "../enums/CLeanlinessEnum";
import { Lifestyle } from "../enums/LifestyleEnum";
import { Pets } from "../enums/PetsEnum";
import { ShortUser } from "./User";

export interface UserProfile extends Profile {
  userId?: number;
  user: ShortUser;
  cleanliness: Cleanliness;
  lifestyle: Lifestyle[];
  pets: Pets;
}
