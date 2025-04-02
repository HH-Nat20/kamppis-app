export const colorSet = {
  darkBlue: "#152a56",
  red: "#953553",
  teal: "#128387",
  blue: "#1f6f8b",

  lightGreen: "#8bc34a",
  lightBlue: "#2196f3",
  purple: "#9c27b0",
  yellow: "#ffc107",
  cyan: "#00bcd4",
  green: "#4caf50",
  orange: "#ff9800",
  deepOrange: "#bf5431",
  indigo: "#9051ff",

  white: "#EFEFEF",
  black: "#000000",
  grey: "#AFAFAF",
  lightGrey: "#F1F1F1",
  darkGrey: "#F5CB36",
};

export const colors = {
  primary: colorSet.darkBlue,
  secondary: colorSet.red,
  tertiary: colorSet.teal,
  quatenary: colorSet.blue,
  quinary: colorSet.lightGreen,
  senary: colorSet.lightBlue,
  septenary: colorSet.purple,
  octonary: colorSet.yellow,
  nonary: colorSet.cyan,
  denary: colorSet.green,
  extra: colorSet.orange,
  bonus: colorSet.deepOrange,

  success: colorSet.green,
  warning: colorSet.yellow,
  danger: colorSet.red,
  info: colorSet.lightBlue,

  background: colorSet.black,
  text: colorSet.white,
  textLight: colorSet.white,
  textDark: colorSet.black,
  border: colorSet.lightGrey,
  shadow: colorSet.darkGrey,
  white: colorSet.white,
  black: colorSet.black,

  active: colorSet.lightGreen,
  inactive: colorSet.grey,
  disabled: colorSet.darkGrey,
};

export const bgGradient: [string, string, ...string[]] = [
  "hsla(227, 93%, 11%, 1)",
  "hsla(228, 93%, 11%, 1)",
  "hsla(227, 93%, 11%, 1)",
];

export const oldBgGradient: [string, string, ...string[]] = [
  "rgba(145, 46, 211, 1)",
  "rgba(103, 28, 151, 1)",
  "rgba(65, 16, 95, 1)",
  "rgba(47, 9, 69, 1)",
];

export const renderTagBgColor = (tag: string): string => {
  switch (tag) {
    case "STUDENT":
      return colors.quinary;
    case "WORKING":
      return colors.extra;
    case "PARTY_GOER":
      return colors.octonary;
    case "EARLY_BIRD":
      return colors.tertiary;
    case "NIGHT_OWL":
      return colors.danger;
    case "PRIVATE_BATHROOM":
      return colors.primary;
    case "SEPARATE_BATHROOM_AND_SHOWER":
      return colors.secondary;
    case "BALCONY":
      return colors.tertiary;
    case "WIFI":
      return colors.quinary;
    case "DISHWASHER":
      return colors.quatenary;
    case "LAUNDRY_MACHINE":
      return colors.quinary;
    default:
      return colors.secondary;
  }
};

export default colors;
