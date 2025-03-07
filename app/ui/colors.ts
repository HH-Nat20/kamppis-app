const colors = {
    primary: "#0F2573",
    secondary: "#192348",
    tertiary: "#233FA6",
    quatenary: "#020D36",
    quinary: "#22AB49",
    senary: "#8FFFAF",
    septenary: "#CC0E96",
    octonary: "#692054",
    nonary: "#C7A21E",
    denary: "#F5CB36",
    extra: "#F96E46",
    bonus: "#A18276",

    success: "#22AB49",
    warning: "#C7A21E",
    danger: "#CC0E96",
    info: "#8FFFAF",

    background: "#020D36",
    text: "#AFAFAF",
    textLight: "#F1F1F1",
    textDark: "#F5CB36",
    border: "#E0E0E0",
    shadow: "#000000",
    white: "#FFFFFF",
    black: "#000000",  

    active: "#8FFFAF",
    inactive: "#8F8F8F",
    disabled: "#293358",

    electricBlue: "#00E8FC",
    mistyRose: "#FFE3E3",
    silver: "A3A3A3",
    battleshipGrey: "#7A918D",
    green: "#2C944A",
    tomato: "#FE654F",
    crayolaRed: "#E84855",

}

export const bgGradient: [string, string, ...string[]] = [
    "hsla(227, 93%, 11%, 1)",
    "hsla(228, 93%, 11%, 1)",
    "hsla(227, 93%, 11%, 1)",
]

export const oldBgGradient: [string, string, ...string[]] = [
    "rgba(145, 46, 211, 1)",
    "rgba(103, 28, 151, 1)",
    "rgba(65, 16, 95, 1)",
    "rgba(47, 9, 69, 1)",
]

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
        default:
            return colors.secondary;
    }
}


export default colors;