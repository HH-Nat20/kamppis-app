export enum Cleanliness {
  SPOTLESS = "SPOTLESS",
  TIDY = "TIDY",
  CASUAL = "CASUAL",
  MESSY = "MESSY",
  CAREFREE = "CAREFREE",
}

export const CleanlinessDescriptions: Record<Cleanliness, string> = {
  [Cleanliness.SPOTLESS]:
    "I keep everything extremely tidy and organized at all times",
  [Cleanliness.TIDY]:
    "I prefer a clean and well-maintained living space with regular cleaning",
  [Cleanliness.CASUAL]:
    "I maintain a generally clean space but I am not overly strict about it",
  [Cleanliness.MESSY]:
    "I leave things around and don't mind occasional clutter",
  [Cleanliness.CAREFREE]:
    "I rarely clean and don't mind a disorganized environment",
};
