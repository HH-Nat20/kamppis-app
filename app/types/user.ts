export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: number[];
  userHabits?: string[]; // Perhaps number[] (habit ids) ?
  userInterests?: string[]; // Perhaps number[] (interest ids) ?
  picture?: string;
}
