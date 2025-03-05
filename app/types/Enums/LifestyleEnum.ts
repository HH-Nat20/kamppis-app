export enum Lifestyle {
  EARLY_BIRD = "EARLY_BIRD",
  NIGHT_OWL = "NIGHT_OWL",
  PARTY_GOER = "PARTY_GOER",
  HOMEBODY = "HOMEBODY",
  STUDENT = "STUDENT",
  WORKING = "WORKING",
}

export const LifestyleDescriptions: Record<Lifestyle, string> = {
  [Lifestyle.EARLY_BIRD]:
    "I prefer waking up early and being active in the morning",
  [Lifestyle.NIGHT_OWL]:
    "I stay up late and I am most productive during nighttime",
  [Lifestyle.PARTY_GOER]:
    "I enjoy social events, nightlife, and frequent gatherings",
  [Lifestyle.HOMEBODY]:
    "I prefer staying at home and enjoy a quiet, cozy environment",
  [Lifestyle.STUDENT]:
    "I am focused on studies, often balancing classes, assignments, and social life",
  [Lifestyle.WORKING]:
    "I have a job which may be on a strict schedule (i.e. 9-5) or on shifts",
};
