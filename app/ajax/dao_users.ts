import { User } from "../types/responses/User";
import { UserForm } from "../validation/userFormSchema";

import { get, create, update, remove } from "./request";

const ENDPOINT = "users";

export const getUser = async (id: number) => {
  const response = await get(`${ENDPOINT}/${id}`);
  const user: User = await response.json();
  return user;
};

export const createUser = async (newUser: User) => {
  const response = await create(`${ENDPOINT}`, newUser);
  const user: User = await response.json();
  return user;
};

export const updateUser = async (userId: number, updatedUser: UserForm) => {
  const response = await update(`${ENDPOINT}/${userId}`, updatedUser);
  const user: User = await response.json();
  return user;
};

export const removeUser = async (id: number) => {
  const response = await remove(`${ENDPOINT}/${id}`);
  const user: User = await response.json();
  return user; // TODO: Check if this is correct
};

export const getUsers = async () => {
  const response = await get(`${ENDPOINT}`);
  const users: User[] = await response.json();
  return users;
};
