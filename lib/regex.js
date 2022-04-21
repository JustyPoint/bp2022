const hexCaracteres = "a-f\\d";
const hexDe3o4 = `#?[${hexCaracteres}]{3}[${hexCaracteres}]?`;
const hexDe6a8 = `#?[${hexCaracteres}]{6}([${hexCaracteres}]{2})?`;
export const noHexChars = new RegExp(`[^#${hexCaracteres}]`, "gi");
export const hexValido = new RegExp(`^${hexDe3o4}$|^${hexDe6a8}$`, "i");
