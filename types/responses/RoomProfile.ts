import { Profile } from "./Profile";
import { ShortUser } from "./User";
import { Flat } from "./Flat";

export interface RoomProfile extends Profile {
  userIds?: number[];
  users: ShortUser[];
  flat: Flat;
  rent: number;
  totalRoommates: number;
  location: string; // TODO: Is this necessary when we have flat.location?
  isPrivateRoom: boolean;
  roomUtilities: string[]; // TODO: Utility enum
}
