import { Utilities } from "../enums/UtilitiesEnum";

export interface Flat {
  id: number;
  name: string;
  description: string;
  location: string;
  totalRoommates: number;
  petHouseHold: boolean;
  roomProfileIds: number[];
  flatUtilities: Utilities[];
}
