import { Gender } from "../enums/GenderEnum";

export type UserForm = {
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
};
