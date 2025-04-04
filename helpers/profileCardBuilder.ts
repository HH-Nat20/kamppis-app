import { UserProfile } from "@/types/responses/UserProfile";
import { RoomProfile } from "@/types/responses/RoomProfile";
import { ProfileCard } from "@/types/ProfileCard";

export function buildShuffledProfileCards(
  profiles: (UserProfile | RoomProfile)[]
): ProfileCard[] {
  const profileCards: ProfileCard[] = [];

  for (const profile of profiles) {
    profileCards.push({
      id: profile.id as unknown as number,
      user: "user" in profile ? profile.user : profile.users,
      profile: profile,
    });
  }

  // Shuffle the profileCards array using Fisher-Yates algorithm
  for (let i = profileCards?.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [profileCards[i], profileCards[j]] = [profileCards[j], profileCards[i]];
  }

  return profileCards;
}
