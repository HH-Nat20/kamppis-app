import { baseUrl, get } from "./request";

export const getServerHealth = async () => {
  const response = await get(`${baseUrl}/health`);
  const health = await response.json();
  return health;
};

export const getDatabaseHealth = async () => {
  const response = await get(`${baseUrl}/db-health`);
  const health = await response.json();
  return health;
};
