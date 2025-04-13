import { RoomProfile } from "@/types/responses/RoomProfile";

import { get, update, remove, create } from "./request";
import { RoomProfileForm } from "@/validation/roomFormSchema";

const ENDPOINT = "room-profiles";

export const getRoomProfiles = async (): Promise<RoomProfile[]> => {
  const response = await get(ENDPOINT);
  const roomProfiles: RoomProfile[] = await response.json();
  return roomProfiles;
};

export const getRoomProfilesByUserId = async (
  userId: number
): Promise<RoomProfile[]> => {
  const response = await get(`${ENDPOINT}/user/${userId}`);
  const roomProfiles: RoomProfile[] = await response.json();
  return roomProfiles;
};

export const getRoomProfile = async (id: number): Promise<RoomProfile> => {
  const response = await get(`${ENDPOINT}/${id}`);
  const roomProfile: RoomProfile = await response.json();
  return roomProfile;
};

export const createRoomProfile = async (
  newRoomProfile: RoomProfileForm
): Promise<RoomProfile> => {
  const response = await create(ENDPOINT, newRoomProfile);
  const roomProfile: RoomProfile = await response.json();
  return roomProfile;
};

export const updateRoomProfile = async (
  roomProfileId: number,
  updatedRoomProfile: RoomProfileForm
) => {
  const response = await update(
    `${ENDPOINT}/${roomProfileId}`,
    updatedRoomProfile
  );
  const roomProfile: RoomProfile = await response.json();
  return roomProfile;
};

export const removeRoomProfile = async (id: number) => {
  const response = await remove(`${ENDPOINT}/${id}`);
  return response.status === 204;
};
