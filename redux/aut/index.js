import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Firebase from "../../ayudantes/firebase";
import { filter, find, isEmpty, omit } from "lodash";

const { bd, eliminar, getSesionEmail, getSesionUsuario, desconectarse } =
  Firebase;

/* EJEMPLO Async Functions (API or direct Firebase access) */
export const afGetExtras = createAsyncThunk(
  "aut/getExtras",
  async (args, thunkAPI) => {
    try {
      const { dispatch, getState, requestId } = thunkAPI;
      const { loading, solicitudID } = getState().aut; // Local state access.
      let customData = {},
        docRef;

      /**Método que crea un objeto personalizado en base a la información de un snapshot firestore.
       * @param {doc} Snapshot de firestore con la información del empleado. */
      const asignar = (doc) => {
        const { catalogo: directorio } = getState().dir; // Obtengo el catálogo directorio.

        // Si EXISTE, personalizo objeto con la información del asociado.
        customData.adsId = doc.data().adsId;
        customData.adscrito =
          find(catAreas, ["areId", doc.data().adsId]).descripcion ||
          "Sín Adscripción...";
        customData.areId = doc.data().areId;
        customData.area =
          find(catAreas, ["areId", doc.data().areId]).descripcion ||
          "Sín Área...";
        customData.biografia = doc.data().biografia;
        customData.catId = doc.data().catId;
        customData.categoria =
          find(categorias, ["catId", doc.data().catId]).descripcion ||
          "Sín Categoría...";
        customData.colaboradores = filter(empleados, [
          "areId",
          doc.data().areId,
        ]).filter((ele) => ele.empId !== doc.data().empId); // Filtro primero los colaboradores del área y luego filtro al asociado.
        customData.email = doc.data().email;
        customData.empleadoID = doc.data().empId || "¡NO ID!";
        customData.foto = doc.data().foto;
        customData.frase = doc.data().frase;
        customData.funciones = doc.data().metadatos?.funciones;
        customData.id = doc.id;
        customData.imagen = doc.data().imagen;
        customData.nombre = doc.data().nombre;
        customData.semblanza = doc.data().semblanza;
        customData.tarjetaActiva = doc.data().metadatos?.tarjetaActiva || null;
        customData.telCelular = find(doc.data().telefono, ["tipo", "Móvil"]); // Regresa el primer objeto de una colección que cumpla con el criterio.
        customData.telFijo = find(doc.data().telefono, ["tipo", "Fijo"]); // Regresa el primer objeto de una colección que cumpla con el criterio.
        customData.telefonos = filter(doc.data().telefono, ["activo", true]); // Regresa un arreglo(colección) con los resultados que cumplan el criterio.
        customData.titulo = doc.data().titulo;
      };

      if (!cargando || requestId !== solicitudID) return; // El código inferior se ejecuta cuando afGetExtras.pending se ha ejecutado...

      if (isEmpty(args)) {
        // Si el método NO tiene argumentos(parámetros)...
        const { asociado } = await getState().aut; // Destructuro mi estado AUT y obtengo el ID del asociado.
        dispatch(
          setMensaje(
            `Buscando coincidencias en asociado.id [${
              asociado.id
            }], colección ${cols.empleados.toUpperCase()}.`
          )
        );
        docRef = bd.collection(cols.empleados).doc(asociado.id);
        await docRef
          .get()
          .then((doc) => {
            if (!doc.exists) {
              dispatch(
                setMensaje(`¡ NO EXISTE EL ASOCIADO ID[${asociado.id}]...!`)
              );
              return customData;
            }
            asignar(doc);
          })
          .catch((error) => {
            console.error("afGetExtras() | Firestore: ", error);
          });
        if (isEmpty(customData)) {
          notificacion(
            "warning",
            "Atención...",
            `No se encontró al usuario [${asociado.id}], usando datos predeterminados...`
          );
          dispatch(setMensaje(`ASIGNANDO ASOCIADO PREDETERMINADO...`));
          docRef = bd.collection(cols.empleados).doc("z5wsWC2zvnitIUFFmHMQ"); // **** <- TODO: El usuario default tiene que ser siempre el director activo...
          await docRef.get().then((doc) => {
            asignar(doc);
          });
        }
      } else if (args.id) {
        dispatch(
          setMensaje(
            `Buscando coincidencias del ID ${args.id} en la colección ${cols.empleados}...`
          )
        );
        docRef = bd.collection(cols.empleados).doc(args.id);
        await docRef
          .get()
          .then((doc) => {
            if (!doc.exists) {
              console.info(
                `<<< CUIDADO >>> afGetExtras()-> * NO EXISTE EL DOCUMENTO ESPECIFICADO CON EL ARGUMENTO ID<${
                  args.id
                }> EN LA COLECCION ${cols.empleados.toUpperCase()}.`
              );
              return customData; // Regreso objeto en BLANCO.
            }
            asignar(doc);
          })
          .catch((error) => {
            console.error("afGetExtras() | Firestore: ", error);
            notificacion("error", "¡Firestore Error!", `<${error}>`);
          });
      }
      return { args, datos: customData };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);
/* Reductor */
export const autSlice = createSlice({
  name: "aut",
  initialState: {
    admin: {},
    authenticated: false,
    error: false,
    extras: {},
    loading: false,
    message: undefined,
    seleccion: {},
    sesion: {},
    solicitudID: undefined,
  },
  reducers: {
    desconectar(state) {
      // notificacion('warning', 'Aviso', `Se ha cerrado la sesión, redireccionando a la pantalla de inicio...`);
      // al.sesion.elimina('firebase');
      state.autenticado = false;
      state.admin = {};
      state.extras = {};
      state.sesion = {};
      desconectarse();
    },
    setAlmacenLocal(state) {
      let localStorage = getAL();
      let usuario = localStorage.usuario || null;
      if (usuario) {
        state.message = `Encontré los datos de ${usuario?.nombre?.corto}[${usuario?.id}] en Local Storage.`;
        state.acercade = usuario;
        state.asociado = { id: usuario?.id };
      } else {
        state.message = `No existen datos de usuario previamente almacenados en el Local Storage.`;
      }
    },
    setAsociado(state, action) {
      const { id } = action.payload;
      state.error = false;
      state.asociado = {
        ...state.asociado,
        id,
      };
      // console.info(`<<AUT SLICE>> setAsociado Ejecutado...`, state.asociado);
    },
    setAutenticado(state, action) {
      state.autenticado = action.payload;
    },
    setCargando(state, action) {
      state.cargando = action.payload;
    },
    setMensaje(state, action) {
      state.message = action.payload;
    },
    setDatos(state) {
      state.error = false;
      state.datos = [];
    },
    setDatosOK(state, action) {
      state.datos = action.payload.datos;
    },
    setDatosNOK(state, action) {
      state.error = action.payload.error;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setSesion: (state, action) => {
      const { datos, message } = action.payload;
      state.sesion = datos;
      state.message = message;
    },
  },
  extraReducers: {
    // Métodos Controladores para las funciones asíncronas
    [afGetExtras.pending]: (state, action) => {
      if (!state.cargando) {
        state.cargando = !state.cargando && true;
        state.error = !!state.error && false;
        state.message =
          "Obteniendo información del usuario desde el catálogo de empleados...";
        state.solicitudID = action.meta.requestId;
      }
    },
    [afGetExtras.rejected]: (state, action) => {
      const { requestId } = action.meta;
      if (state.cargando && state.solicitudID === requestId) {
        state.message =
          "ERROR al obtener asociado del catálogo de empleados, vease error...";
        state.error = action.error;
        state.cargando = state.cargando && false;
        state.solicitudID = undefined;
      }
    },
    [afGetExtras.fulfilled]: (state, action) => {
      const { args, datos } = action.payload;
      if (
        !isEmpty(datos) &&
        state.cargando &&
        state.solicitudID === action.meta.requestId
      ) {
        // notificacion('info', 'En instantes...', `...estará lista la información de ${datos.nombre.corto}.`);
        // console.log('<<DEBUG>> Datos recibidos del backend: ', datos);
        //state.message = isEmpty(args) ? `La información de ${datos.nombre.corto} fué establecida exitosamente...` : `La información de ${datos.nombre.corto}(ID) fué establecida exitosamente...`;
        state.acercade = datos;
        state.solicitudID = undefined;
        // Agrego datos del usuario a LocalStorage...
        al.agrega("usuario", datos);
        // console.info(`<<< DEBUG >>> afGetExtras.fulfilled-> * USUARIO ASIGNADO CON ÉXITO AL ALMACEN.`);
      }
      state.cargando = state.cargando && false;
    },
  },
});

/* NOMBRE */
export const { name } = autSlice.name;

/* ACCIONES
Este método exporta las acciones definidas en el 'slice->reducers' para ser utilizadas posteriormente.*/
export const {
  desconectar,
  setAlmacenLocal,
  setAsociado,
  setAutenticado,
  setCargando,
  setDatos,
  setDatosOK,
  setDatosNOK,
  setError,
  setMensaje,
  setMeta,
  setMetaOK,
  setMetaNOK,
  setSesion,
} = autSlice.actions;

/* SELECTORES / GETTERS
Estas funciónes/métodos son selectores(getters) y permiten  acceder a un valor especifico de este reductor/estado.
Los selectores también pueden ser definidos "en línea" en el módulo en donde sean necesitados, usando:
'useSelector((state) => state.contador.valor)'
Por lo que la declaración de esta función selectora es opcional.*/
export const getAcercaDe = (state) => state.aut.acercade;
export const getAsociado = (state) => state.aut.asociado;
export const getAutenticado = (state) => state.aut.autenticado;
export const getCargando = (state) => state.aut.cargando;
export const getDatos = (state) => state.aut.datos;
export const getExtras = (state) => state.aut.extras;
export const getSeleccion = (state) => state.aut.seleccion;
export const getSesion = (state) => state.aut.sesion;

/* Exporto el reductor de forma default */
export default autSlice.reducer;
