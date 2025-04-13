import { Utilities } from "../enums/UtilitiesEnum";
import { Location } from "../enums/LocationEnum";
export interface Flat {
  id: number;
  name: string;
  description: string;
  location: Location;
  totalRoommates: number;
  petHousehold: boolean;
  roomProfileIds: number[];
  flatUtilities: Utilities[];
}
