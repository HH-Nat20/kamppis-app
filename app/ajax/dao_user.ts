import { User } from "../types/user";

import { get, create, update, remove } from "./request";

export const getUser = async (id: number) => {
  const response = await get(`/user/${id}`);
  const user: User = await response.json();
  return user;
};

export const createUser = async (newUser: User) => {
  const response = await create(`/user`, newUser);
  return response;
};

export const updateUser = async (updatedUser: User) => {
  const response = await update(`/api/user/${updatedUser.id}`, updatedUser);
  return response;
};

export const removeUser = async (id: number) => {
  const response = await remove(`/user/${id}`);
  return response;
};

export const getUsers = async () => {
  const response = await get(`/user`);
  const users: User[] = await response.json();
  return users;
};
