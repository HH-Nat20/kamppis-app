import { User } from "../types/responses/User";
import { MatchUser } from "../types/Match";

import { get, create, update, remove } from "./request";

const ENDPOINT = "users";

export const getUser = async (id: number) => {
  const response = await get(`${ENDPOINT}/${id}`);
  const user: MatchUser = await response.json();
  return user;
};

export const createUser = async (newUser: User) => {
  const response = await create(`${ENDPOINT}`, newUser);
  return response;
};

export const updateUser = async (updatedUser: User) => {
  const response = await update(`${ENDPOINT}/${updatedUser.id}`, updatedUser);
  return response;
};

export const removeUser = async (id: number) => {
  const response = await remove(`${ENDPOINT}/${id}`);
  return response;
};

export const getUsers = async () => {
  const response = await get(`${ENDPOINT}`);
  const users: MatchUser[] = await response.json();
  return users;
};
