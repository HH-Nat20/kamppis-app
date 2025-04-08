import { Cleanliness } from "../enums/CLeanlinessEnum";
import { Lifestyle } from "../enums/LifestyleEnum";
import { Pets } from "../enums/PetsEnum";

export type UserProfileForm = {
  userId: number;
  type: "userProfile" | "roomProfile";
  cleanliness: Cleanliness;
  lifestyle: Lifestyle[];
  bio: string;
  pets: Pets[];
};
