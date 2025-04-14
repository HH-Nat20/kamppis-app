import { Profile } from "./Profile";
import { ShortUser } from "./User";
import { Flat } from "./Flat";

export interface RoomProfile extends Profile {
  id: number;
  flat: Flat;
  rent: number;
  name: string;
  isPrivateRoom: boolean;
  furnished: boolean;
  furnishedInfo: string;
  userIds?: number[];
  users: ShortUser[];
  status?: "ACTIVE" | "INACTIVE";
}
