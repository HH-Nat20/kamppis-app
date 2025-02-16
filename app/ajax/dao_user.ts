import { User } from "../types/user";

import { get, create, update, remove } from "./request";

const ENDPOINT = "users";

export const getUser = async (id: number) => {
  const response = await get(`/${ENDPOINT}/${id}`);
  const user: User = await response.json();
  return user;
};

export const createUser = async (newUser: User) => {
  const response = await create(`/${ENDPOINT}`, newUser);
  return response;
};

export const updateUser = async (updatedUser: User) => {
  const response = await update(
    `/api/${ENDPOINT}/${updatedUser.id}`,
    updatedUser
  );
  return response;
};

export const removeUser = async (id: number) => {
  const response = await remove(`/${ENDPOINT}/${id}`);
  return response;
};

export const getUsers = async () => {
  const response = await get(`/${ENDPOINT}`);
  const users: User[] = await response.json();
  return users;
};
