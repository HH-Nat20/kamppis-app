import { Gender } from "../enums/GenderEnum";
import { Cleanliness } from "../enums/CLeanlinessEnum";
import { Lifestyle } from "../enums/LifestyleEnum";
import { Location } from "../enums/LocationEnum";

export type RoomProfileForm = {
  rent: number;
  totalRoommates: number;
  location: string;
  isPrivateRoom: boolean;
  roomUtilities: string[];
  flatId: number; // ???
};
