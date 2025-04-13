import { Location } from "../enums/LocationEnum";
import { Utilities } from "../enums/UtilitiesEnum";

export type FlatForm = {
  name: string;
  description: string;
  location: Location;
  totalRoommates: number;
  petHousehold: boolean;
  flatUtilities: Utilities[];
};
