import { RoomProfile } from "@/types/responses/RoomProfile";
import { UserProfile } from "@/types/responses/UserProfile";

import { get, update, remove, create } from "./request";
import { RoomProfileForm } from "@/validation/roomFormSchema";

import { SwiperResponse } from "@/types/responses/Swiper";

import { InviteResponse } from "@/types/responses/Invite";

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

export const getRoomProfileSwipers = async (
  roomProfileId: number,
  page: number = 0,
  size: number = 5
): Promise<SwiperResponse> => {
  const response = await get(
    `${ENDPOINT}/${roomProfileId}/swipersquery?size=${size}&page=${page}`
  );
  const data = await response.json();

  const swipers: UserProfile[] = data.content;
  const totalElements: number = data.totalElements;
  const totalPages: number = data.totalPages;
  const last: boolean = data.last;

  return { swipers, totalElements, totalPages, last };
};

export const getRoomProfileInvite = async (
  roomProfileId: number
): Promise<InviteResponse> => {
  const response = await get(`/invites/generate-invitetoken/${roomProfileId}`);
  const inviteResponse: InviteResponse = await response.json();
  return inviteResponse;
};

export const joinRoomProfile = async (
  inviteToken: string
): Promise<InviteResponse> => {
  const response = await get(`/invites/join/${inviteToken}`);
  const joinResponse: InviteResponse = await response.json();
  return joinResponse;
};
