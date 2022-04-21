// External Components
import { Dimensions, PixelRatio, StyleSheet } from "react-native";
// Internal Components

const { width, height } = Dimensions.get("window"),
  vw = width / 100,
  vh = height / 100;

const factorAltura = (1 + raiz2(2)) / 2;
const marcadorAncho = 100;
const marcadorAlto = factorAltura * marcadorAncho;
const marcadorColor = "lightGreen";
const sombraOpacidad = 0.5;
const sombraTamaño = 50;
const radioPulsacion = 200;

/* Tamaño Guía basado en dimensiones lógicas del IphoneSE 2a generación" */
const BASE_ANCHO = 375,
  BASE_ALTO = 667;

const [SHORT_DIMENSION, LONG_DIMENSION] =
  width < height ? [width, height] : [height, width];
const factorBaseWidth = SHORT_DIMENSION / BASE_ANCHO;
const factorBaseHeight = LONG_DIMENSION / BASE_ALTO;

/** Normaliza el escalado de fuentes usando factor de escala en base a la altura. */
export const fontPixel = (size) => heightPixel(size);
/** Método para normalizar tamaños horizontales (padding, margin) */
export const widthPixel = (size) => normalizeScale(size, "width");
/** Método para normalizar tamaños verticales (padding, margin) */
export const heightPixel = (size) => normalizeScale(size, "height");
/** Método normalizador para ambas escalas */
export const normalizeScale = (size, base = "width") => {
  let newSize =
    base === "height" ? size * factorBaseHeight : size * factorBaseWidth;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
/** Método normalizador escala moderada */
export const moderateScale = (pixeles, factor = 0.5) =>
  pixeles + (widthPixel(pixeles) - pixeles) * factor;

export const FULLSCREEN = { ...StyleSheet.absoluteFillObject };

export const lista = {
  height: height * 0.1,
  width: PorcentajeAncho(96),
  margin: PorcentajeAncho(2),
};

/**PorcentajeAncho  - devuelve el numero de pixeles en base añ porcentaje dado
 * @param {Number} porcentaje - los datos de navegacion */
export function PorcentajeAncho(porcentaje) {
  let factor = (porcentaje * width) / 100;
  return Math.round(factor);
}

/**Función que devuelve la raiz cuadrada del valor dado.
 * @param {Number} valor - Número a procesar.
 * @return {float} Número con decimales.*/
export function raiz2(valor) {
  let x0 = 1;
  let x1 = x0;
  for (let i = 0; i < 10; i++) {
    x1 = x0 - (x0 * x0 - Math.abs(valor)) / (2 * x0);
    x0 = x1;
  }
  return x1;
}

export const getBreakpointForScreenSize = ({ theme, dimensions }) => {
  const sortedBreakpoints = Object.entries(theme.breakpoints).sort(
    (valA, valB) => {
      return valA[1] - valB[1];
    }
  );

  return sortedBreakpoints.reduce((acc, [breakpoint, minWidth]) => {
    if (dimensions.width >= minWidth) return breakpoint;
    return acc;
  }, null);
};

export const getResponsiveValue = ({ value, theme }) => {
  if (typeof value === "object") {
    return value[
      getBreakpointForScreenSize({ theme, dimensions: { width, height } })
    ];
  }
  return value;
};

export function transitions(timing = 0.3) {
  return `
        -webkit-transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
        -moz-transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
        -ms-transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
        -o-transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
        transition: all ${timing}s cubic-bezier(0.215, 0.61, 0.355, 1);
    `;
}

export function borderRadius(radius = 0) {
  return `
        -webkit-border-radius: ${radius};
        -moz-border-radius: ${radius};
        -ms-transition: ${radius};
        -o-border-radius: ${radius};
        border-radius: ${radius};
    `;
}

export function boxShadow(shadow = "none") {
  return `
        -webkit-box-shadow: ${shadow};
        -moz-box-shadow: ${shadow};
        box-shadow: ${shadow};
    `;
}
