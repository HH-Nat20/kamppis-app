import { User } from "@/types/responses/User";
import { UserForm } from "@/validation/userFormSchema";

import { get, getWithoutAuth, create, update, remove } from "./request";

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
  return response.status === 204;
};

export const getUsers = async () => {
  const response = await get(`${ENDPOINT}`);
  const users: User[] = await response.json();
  return users;
};

export const getMockUsers = async () => {
  const response = await getWithoutAuth(`${ENDPOINT}/mock`); // Mock users endpoint for testing
  const users: User[] = await response.json();
  return users;
};

export const changePassword = async (
  userId: number,
  oldPassword: string,
  newPassword: string
) => {
  const response = await update(`${ENDPOINT}/${userId}/password`, {
    oldPassword,
    newPassword,
  });
  return response.status === 204;
};

export const copyUserData = async (userId: number) => {
  const response = await get(`${ENDPOINT}/${userId}/copy`);
  const data = await response.json();
  return data;
};
