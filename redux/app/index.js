// External Components
import { Appearance, Dimensions, Platform } from "react-native";
import { createSlice } from "@reduxjs/toolkit";
// Internal Components
import { getBreakpointForScreenSize } from "../../lib/style";
import { theme } from "../../lib/theme";

const dimensions = Dimensions.get("window");
const { width, height, scale } = dimensions,
  vw = width / 100,
  vh = height / 100;

export const appSlice = createSlice({
  name: "app",
  initialState: {
    breakpoint: getBreakpointForScreenSize({ theme, dimensions }),
    colorScheme: Appearance.getColorScheme(),
    error: false,
    flags: {
      actualizar: false,
      asociado: false,
      cargando: false,
      cupon: false,
      inyectando: false,
      modal: false,
      mostrar: false,
      nuevo: true,
      panelActivo: false,
      qrEscaner: false,
      visualizar: false,
    },
    isIOS: Platform.OS === "ios",
    locale: {
      idioma: navigator.language.split(/[-_]/)[0],
      pais: navigator.language.split(/[-_]/)[1],
    },
    message: undefined,
    metrics: { trys: 5 },
    onLine: false,
    platform: {
      OS: Platform.OS,
      version: Platform.Version,
      ...Platform.constants,
    },
    theme: { ...theme },
    window: {
      height: Math.round(height),
      maxView: Math.max(vw, vh),
      minView: Math.min(vw, vh),
      scale,
      width,
      vh,
      vw,
    },
    version: "v0422-001",
  },
  reducers: {
    alternaActualizar: (state) => {
      state.flags.actualizar = !state.flags.actualizar;
    },
    alternaAsociado: (state) => {
      state.flags.asociado = !state.flags.asociado;
    },
    alternaCupon: (state) => {
      state.flags.cupon = !state.flags.cupon;
    },
    alternaEscaner: (state) => {
      state.flags.qrEscaner = !state.flags.qrEscaner;
    },
    alternaModal: (state) => {
      state.flags.modal = !state.flags.modal;
    },
    alternaNuevo: (state) => {
      state.flags.nuevo = !state.flags.nuevo;
    },
    alternaPanel: (state) => {
      state.flags.panelActivo = !state.flags.panelActivo;
    },
    alternaVisualizar: (state) => {
      state.flags.visualizar = !state.flags.visualizar;
    },
    decTrys: (state) => {
      state.metrics = { ...state.metrics, trys: state.metrics.trys-- };
    },
    incTrys: (state) => {
      state.metrics = { ...state.metrics, trys: state.metrics.trys++ };
    },
    resetTrys: (state) => {
      state.metrics = { ...state.metrics, trys: 5 };
    },
    setCargando: (state, action) => {
      const { value, message } = action.payload;
      state.flags.cargando = value;
      state.message = message || undefined;
    },
    setColorScheme: (state, action) => {
      state.colorScheme = action.payload;
    },
    setOnLine: (state, action) => {
      state.onLine = action.payload;
    },
    setIdioma: (state, action) => {
      state.locale.idioma = action.payload;
    },
    setInyectando: (state, action) => {
      const { value, message } = action.payload;
      state.flags.inyectando = value;
      state.message = message || undefined;
    },
    setMostrar: (state, action) => {
      state.flags.mostrar = action.payload;
    },
    setPais: (state, action) => {
      state.locale.pais = action.payload;
    },
    setWindow: (state, action) => {
      const { height, width } = action.payload; // Destructuro los datos contenidos en payload.
      state.window = { ...state.window, height: Math.round(height), width };
    },
    setVersion: (state, action) => {
      state.version = action.payload;
    },
  },
});

/* NOMBRE */
export const { name } = appSlice;

/* ACCIONES
Este método exporta las acciones definidas en el 'slice->reducers' para ser utilizadas individualmente posteriormente.*/
export const {
  alternaActualizar,
  alternaAsociado,
  alternaCupon,
  alternaEscaner,
  alternaModal,
  alternaNuevo,
  alternaPanel,
  alternaVisualizar,
  decTrys,
  incTrys,
  resetTrys,
  setCargando,
  setColorScheme,
  setOnLine,
  setMostrar,
  setIdioma,
  setInyectando,
  setPais,
  setWindow,
  setVersion,
} = appSlice.actions;

/* SELECTORES
Estas funciónes/métodos son selectores y permiten  acceder a un valor especifico de este reductor/estado.
Los selectores también pueden ser definidos "en línea" en el módulo en donde sean necesitados, usando:
'useSelector((state) => state.contador.valor)'
Por lo que la declaración de esta función selectora es opcional.*/
export const selAbrir = (state) => state.app.barra.abrir;
export const selActualizar = (state) => state.app.flags.actualizar;
export const selAsociado = (state) => state.app.flags.asociado;
export const selCargando = (state) => state.app.flags.cargando;
export const selColapsada = (state) => state.app.barra.colapsada;
export const selColorScheme = (state) => state.app.colorScheme;
export const selOnLine = (state) => state.app.onLine;
export const selCupon = (state) => state.app.flags.cupon;
export const selConfig = (state) => state.app.config;
export const selIdioma = (state) => state.app.locale.idioma;
export const selIntentos = (state) => state.app.metrics.trys;
export const selInyectando = (state) => state.app.flags.inyectando;
export const selMetadatos = (state) => state.app.metadatos;
export const selmetrics = (state) => state.app.metrics;
export const selModal = (state) => state.app.flags.modal;
export const selMostrar = (state) => state.app.flags.mostrar;
export const selPanelActivo = (state) => state.app.flags.panelActivo;
export const selPais = (state) => state.app.locale.pais;
export const selPosicion = (state) => state.app.barra.posicion;
export const selRutaAbierta = (state) => state.app.ruta.abierta;
export const selRutaActual = (state) => state.app.ruta.actual;
export const selNuevo = (state) => state.app.flags.nuevo;
export const selOscuro = (state) => state.app.flags.oscuro;
export const selUbicacion = (state) => state.app.config.ubicacion;
export const selVersion = (state) => state.app.version;
export const selwindow = (state) => state.app.window;
export const selVisibilidad = (state) => state.app.barra.visibilidad;
export const selVisualizar = (state) => state.app.flags.visualizar;
export const selVista = (state) => state.app.vista;

/* Exporto el reductor de forma default */
export default appSlice.reducer;
