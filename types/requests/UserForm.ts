import { Gender } from "../enums/GenderEnum";
import { LookingFor } from "../enums/LookingForEnum";

export type UserForm = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  lookingFor: LookingFor;
  gender: Gender;
};
