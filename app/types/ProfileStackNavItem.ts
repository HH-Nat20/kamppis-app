import { ProfileStackParamList } from "../navigation/ProfileStackNavigator";

export type ProfileStackNavItem = {
  icon: any;
  label: string;
  href: keyof ProfileStackParamList;
};
