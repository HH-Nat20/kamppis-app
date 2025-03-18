import { get } from "./request";

export const getServerHealth = async () => {
  const response = await get(`health`);
  const health = await response.json();
  return health;
};

export const getDatabaseHealth = async () => {
  const response = await get(`db-health`);
  const health = await response.json();
  return health;
};
