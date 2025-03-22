import { User } from "../types/responses/User";
import { ProfileCard } from "../types/ProfileCard";

export function buildShuffledProfileCards(users: User[]): ProfileCard[] {
  const profileCards: ProfileCard[] = [];

  for (const user of users) {
    // Add the user's personal profile
    if (user.userProfile) {
      profileCards.push({
        id: user.userProfile.id as unknown as number,
        user,
        profile: user.userProfile,
      });
    }

    // Add each of the user's room profiles
    for (const roomProfile of user.roomProfiles ?? []) {
      profileCards.push({
        id: roomProfile.id as unknown as number,
        user,
        profile: roomProfile,
      });
    }
  }

  // Shuffle the profileCards array using Fisher-Yates algorithm
  for (let i = profileCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [profileCards[i], profileCards[j]] = [profileCards[j], profileCards[i]];
  }

  return profileCards;
}
