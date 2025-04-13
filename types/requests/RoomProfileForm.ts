import { Location } from "../enums/LocationEnum";

export type RoomProfileForm = {
  rent: number;
  totalRoommates: number;
  location: Location;
  isPrivateRoom: boolean;
  furnished: boolean;
  furnishedInfo: string;
  flatId: number; // ???
};
