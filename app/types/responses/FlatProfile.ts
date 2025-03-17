import { Profile } from "./Profile";

export interface FlatProfile extends Profile {
  rent: number;
  ownRoom: boolean;
  location: string;
  people: number;
  utilities: string[]; // TODO: Utility enum
}
