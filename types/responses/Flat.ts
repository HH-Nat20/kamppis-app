export interface Flat {
  id: number;
  name: string;
  description: string;
  location: string;
  totalRoommates: number;
  petHouseHold: boolean;
  roomProfileIds: number[];
  flatUtilities: string[];
}
