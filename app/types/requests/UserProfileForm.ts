import { Cleanliness } from "../enums/CLeanlinessEnum";
import { Lifestyle } from "../enums/LifestyleEnum";

export type UserProfileForm = {
  cleanliness: Cleanliness;
  lifestyle: Lifestyle[];
  bio: string;
};
