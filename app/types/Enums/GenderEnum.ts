export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
  NOT_IMPORTANT = "NOT_IMPORTANT",
}

export const GenderLabels: Record<Gender, string> = {
  [Gender.MALE]: "Male",
  [Gender.FEMALE]: "Female",
  [Gender.OTHER]: "Other",
  [Gender.NOT_IMPORTANT]: "Prefer not to say",
};
