import { UserProfile } from "./responses/UserProfile";
import { RoomProfile } from "./responses/RoomProfile";
import { ShortUser } from "./responses/User";

export interface ProfileCard {
  id: number; // Should match profileId
  user: ShortUser | ShortUser[];
  profile: UserProfile | RoomProfile;
}
