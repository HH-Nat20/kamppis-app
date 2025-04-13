import { Flat } from "@/types/responses/Flat";
import { FlatForm } from "@/types/requests/FlatForm";

import { get, update, remove, create } from "./request";

const ENDPOINT = "flats";

export const getFlats = async (): Promise<Flat[]> => {
  const response = await get(ENDPOINT);
  const flats: Flat[] = await response.json();
  return flats;
};

export const getFlat = async (id: number): Promise<Flat> => {
  const response = await get(`${ENDPOINT}/${id}`);
  const flat: Flat = await response.json();
  return flat;
};

export const createFlat = async (newFlat: FlatForm): Promise<Flat> => {
  const response = await create(ENDPOINT, newFlat);
  const flat: Flat = await response.json();
  return flat;
};

export const updateFlat = async (flatId: number, updatedFlat: FlatForm) => {
  const response = await update(`${ENDPOINT}/${flatId}`, updatedFlat);
  const flat: Flat = await response.json(); // The backend doesn't include userId's
  return flat;
};

export const removeFlat = async (id: number) => {
  const response = await remove(`${ENDPOINT}/${id}`);
  return response.status === 204;
};
