import { Profile } from "./Profile";

export interface RoomProfile extends Profile {
  userIds?: number[];
  rent: number;
  totalRoommates: number;
  location: string;
  isPrivateRoom: boolean;
  roomUtilities: string[]; // TODO: Utility enum
}
