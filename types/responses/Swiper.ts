import { UserProfile } from "./UserProfile";

export type SwiperResponse = {
  swipers: UserProfile[];
  totalElements: number;
  totalPages: number;
  last: boolean;
};
