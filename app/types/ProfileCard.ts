import { UserProfile } from "./responses/UserProfile";
import { RoomProfile } from "./responses/RoomProfile";
import { User } from "./responses/User";

export interface ProfileCard {
  id: number; // Should match profileId
  user: User;
  profile: UserProfile | RoomProfile;
}
