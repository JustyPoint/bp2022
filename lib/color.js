// Módulos Externos
import isEmpty from "lodash/isEmpty";
// Módulos Internos
import { hexValido, noHexChars } from "./regex";

/** Metodo que covierte el URL de https://coolors.co/ en un arreglo de colores HEX.
 * @param {String} URL con paleta de colores.
 * @param {String} transparencia String con un porcentaje. Ejemplo "75%".
 * @returns {Array} Arreglo con colores hexadecimales, si se especifica transparencia, se la agrega. */
export const coolorsToHex = (URL, transparencia = undefined) => {
  if (transparencia) {
    return URL.replace(/^.+\/([^/]+)$/, "$1")
      .split("-")
      .map((hex) => `#${hex}${transparencia.replace(/(%)/, "")}`);
  }
  return URL.replace(/^.+\/([^/]+)$/, "$1")
    .split("-")
    .map((hex) => `#${hex}`);
};

/** Método que convierte colores HEX en RGB
 * @param {String} hex Color HEX de 3 a 8 posiciones.
 * @param {Object} opciones JSON-> alfa: {Number}, formato: {String} 'array' | 'css'
 * @returns {String} JSON {red, green, blue, alpha} ó ARRAY [red, green, blue, alpha] ó CSS 'rgb(188,214,222, 0.75)' */
export const hex2rgb = (hex, opciones = {}) => {
  if (typeof hex !== "string" || noHexChars.test(hex) || !hexValido.test(hex))
    throw new TypeError("No es un string válido hexadecimal.");

  let valorAlfa = 1; // ALPHA default, si el color HEX no especifica.

  hex = hex.replace(/^#/, ""); // Si el string contiene un '#' lo elimino. Asumiendo longitud de 6.
  // Validación y preparación del HEX.

  if (hex.length === 8) {
    //valorAlfa = Number.parseInt(hex.slice(6, 8), 16) / 255;
    valorAlfa = (Number.parseInt(hex.slice(6, 8), 26) / 255).toFixed(2);
    hex = hex.slice(0, 6);
    // console.info(`☣ <<DEBUG>> LARGO(${hex.length}):`, valorAlfa, 'H:', hex);
  } else if (hex.length === 4) {
    valorAlfa = Number.parseInt(hex.slice(3, 4).repeat(2), 16) / 255; // Tomo el último valor como ALPHA, lo repito y lo calculo.
    hex = hex.slice(0, 3); // Convierto el HEX a 3 posiciones.
  }
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]; // Convierto los HEX de 3 a 6 posiciones.
  }
  // Lógica
  const numero = Number.parseInt(hex, 16);
  const red = numero >> 16;
  const green = (numero >> 8) & 255;
  const blue = numero & 255;
  const alpha = typeof opciones.alfa === "number" ? opciones.alfa : valorAlfa;
  // Opciones de retorno...
  if (opciones.formato === "array") {
    return [red, green, blue, alpha];
  }
  if (opciones.formato === "css") {
    // const alphaString = alpha === 1 ? '' : `${Number((alpha * 100).toFixed(2))}%`;
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }
  return { red, green, blue, alpha }; // Retorno default
};

/**
 * Invierte los valores de la paleta primaria y secundaria de colores de un tema.
 * @param paleta Objeto de strings hexadecimales que representan una paleta de colores.
 * @example
 * invertirPaleta({ primaria: ['rojo', 'amarillo', 'verde'] });
 * devuelve: { primaria: ['verde', 'amarillo', 'rojo'] } */
export const invertirPaleta = (paleta = {}) => {
  try {
    if (!isEmpty(paleta)) {
      return Object.keys(paleta).reduce(
        (nuevaPaleta, key) => ({
          ...nuevaPaleta,
          [key]: [...paleta[key]].reverse(),
        }),
        {}
      );
    } else {
      return [];
    }
  } catch (error) {
    console.error("utilidades->invertirPaleta ", error);
  }
};

const color = {
  alerta: "#ffbf00",
  exito: "#00b16a",
  error: "#f64744",
  info: "#3582FD",
  amarillo: "#ffff00",
  amarilloClaro: "#f3f9a7",
  amarilloOscuro: "#fdbb2d",
  amarilloPastel: "#f9f270",
  asbesto: "#7f8c8d",
  azul: "blue",
  azulCielo: "#23c3e0",
  azulXiketic: "#101021",
  azulCadete: "#181830",
  azulEncased: "#283c86",
  azulDefault: "#007AFF",
  azulEncendido: "#0947db",
  azulElegante: "#7383DD",
  azulMental: "#00B4DB",
  azulMorena: "#24abad",
  azulNocturno: "#2c3e50",
  AzulAlice: "#e7f1f4",
  azulPacifico: "#03a9bb",
  azulOro: "#0028ff",
  azulRey: "#141628",
  azulRio: "#3498db",
  azulTranquilo: "#3d75e5",
  azulTiktok: "#69C9D0",
  blanco: "#ffffff",
  cafeMadera: "#86592d",
  cafeOscuro: "#372411",
  calabaza: "#d35400",
  cyanOscuro: "#008D99",
  carmesi: "#DC143C",
  carbon: "#111111",
  champagne: "#FCF6B1",
  concreto: "#95a5a6",
  crema: "#f5f1c4",
  cyan: "#00ffff",
  desierto: "#ccae62",
  esmeralda: "#2ecc71",
  grisAzulado: "#F9FAFB",
  grisCharleston: "#1E262C",
  grisMetalico: "#263138",
  grisGainboro: "#DFE4E8",
  grisCultured: "#F4F6F8",
  grisSonico: "#70777f",
  grisRomano: "#888d94",
  gris: "#808080",
  grisGis: "#474f5c",
  grisCEAS: "#cccccc",
  grisClaro: "#aaaaaa",
  grisOscuro: "#464646",
  grisEspacial: "#52686d",
  khaki: "#F0E68C",
  ladrillo: "#B22222",
  mandarina: "#ffb142",
  marron: "#42120d",
  neon: "#40f2fe",
  morado: "#800080",
  moradoClaro: "#8e518e",
  moradoOscuro: "#2D1E2F",
  moradoPastel: "#bca2c7",
  morena: "#AD2624",
  naranja: "#ff2301",
  naranjaClaro: "#f8ae2c",
  negroEerie: "#161e23",
  negroFogra: "#090912",
  naranjaFlare: "#f5af19",
  naranjaMedio: "#f39c12",
  naranjaOscuro: "#fc4a1a",
  naranjaPrecaucion: "#FF8800",
  naranjaTranquilo: "#e5ad3d",
  negro: "#000000",
  ocre: "#cc8e35",
  oro: "#ffd700",
  plata: "#bdc3c7",
  rojo: "#ff0000",
  rojoClaro: "#ee2d29",
  rojoError: "#CC0000",
  rojoFlare: "#f12711",
  rojoGranada: "#c0392b",
  rojoImperial: "#ed213a",
  rojoMorena: "#ad2624",
  rojoOscuro: "#93291E",
  rojoPastel: "#f94848",
  rojoTiktok: "#EE1D52",
  rojoTranquilo: "#c33636",
  rosa: "#FF69B4",
  rosaElegante: "#CA79DC",
  rosaEncendido: "#e86c9a",
  rosaProfundo: "#ff0099",
  rosaPastel: "#ffabab",
  transparente: "transparent",
  turquesa: "#1abc9c",
  verde: "green",
  verdeAcido: "#cac531",
  verdeAzulado: "#688581",
  salmon: "#f19872",
  teal: "#008080",
  ultramarino: "#181dff",
  verdeClaro: "#00ff0c",
  verdeExito: "#00C851",
  verdeEspaña: "#009345",
  verdeMar: "#16a085",
  verdeEncendido: "#07d89d",
  verdeMedio: "#27ae60",
  verdeMorena: "#16A085",
  verdeOscuro: "#006004",
  verdeMing: "#00616D",
  verdeMingOscuro: "#00707c",
  verdePantone: "#00b549",
  verdeMedianoche: "#005662",
  violetaClaro: "#eaafc8",
  violetaOscuro: "#654ea3",
  violetaRojizo: "#b91d73",
  zanahoria: "#e67e22",
  meta: {
    azulClaro: "#1877f2",
    azulOscuro: "#3b5998,",
  },
  twitter: {
    azulClaro: "#1da1f2",
    blanco: "#f5f8fa",
    gris: "#aab8c2",
    grisClaro: "#e1e8ed",
    negro: "#14171a",
  },
  youtube: {
    blanco: "#ffffff",
    negro: "#282828",
    rojo: "#ff0000",
  },
  linkedIn: {
    azul: "#0a66c2",
    blanco: "#ffffff",
    negro: "#000000",
    rosa: "#f0b6a8",
  },
  instagram: {
    azul: "#4c5fd7",
    amarillo: "#ffdc7d",
    magenta: "#c32aa3",
    morado: "#7232bd",
    naranja: "#f46f30",
  },
  tiktok: {
    azul: "#69c9d0",
    blanco: "#ffffff",
    negro: "#010101",
    rojo: "#ee1d52",
  },
  google: {
    azul: "#4285f4",
    amarillo: "#fbbc05",
    rojo: "#ea4335",
    verde: "#34a853",
  },
  whatsApp: {
    azul: "#34b7f1",
    crema: "#dcf8c6",
    verdeClaro: "#25d366",
    verdeMedio: "#128c7e",
    verdeOscuro: "#075e54",
  },
};

export default color;
