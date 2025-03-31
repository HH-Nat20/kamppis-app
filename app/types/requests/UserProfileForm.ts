import { Cleanliness } from "../enums/CLeanlinessEnum";
import { Lifestyle } from "../enums/LifestyleEnum";

export type UserProfileForm = {
  userId: number;
  type: "userProfile" | "roomProfile";
  cleanliness: Cleanliness;
  lifestyle: Lifestyle[];
  bio: string;
};
