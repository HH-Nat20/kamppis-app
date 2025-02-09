import { User } from "../types/user";

import { baseUrl, get, create, update, remove } from "./request";

export const getUser = async (id: number) => {
  const response = await get(`${baseUrl}/user/${id}`);
  const user: User = await response.json();
  return user;
};

export const createUser = async (newUser: User) => {
  const response = await create(`${baseUrl}/user`, newUser);
  return response;
};

export const updateUser = async (updatedUser: User) => {
  const response = await update(
    `${baseUrl}/api/user/${updatedUser.id}`,
    updatedUser
  );
  return response;
};

export const removeUser = async (id: number) => {
  const response = await remove(`${baseUrl}/user/${id}`);
  return response;
};

export const getUsers = async () => {
  const response = await get(`${baseUrl}/user`);
  const users: User[] = await response.json();
  return users;
};
