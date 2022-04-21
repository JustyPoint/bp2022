/* DIRECTORY SLICE */
// External Components
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Internal Components
import Firebase, { collections as c } from "../../lib/firebase";
import { filter, isEmpty, map, orderBy } from "lodash";
import { capitalizar, getTipo } from "../../lib/utils";
import { c } from "../../config";

const { bd, fnInstantanea2Arreglo } = Firebase;

// Área de métodos/funciónes asíncronas para leer Firestore...
export const getDirectorio = createAsyncThunk(
  "dir/getDirectorio",
  async (args, thunkAPI) => {
    try {
      const { dispatch, getState } = thunkAPI;
      let catalogo = [];
      if (isEmpty(args)) {
        dispatch(setMessage(`Filtrando TODOS los ${c.dire}...`));
        let snapshot = await bd
          .collection(c.dire)
          .get()
          .catch((error) => {
            console.error("FIRESTORE: ", error);
          });
        if (snapshot.empty) {
          console.info("<<<DEBUG >>> getDirectorio-> NO HAY DATOS...");
          return catalogo;
        }
        catalogo = fnInstantanea2Arreglo(snapshot);
      }
      if (args.activos) {
        let snapshot = await bd
          .collection(c.dire)
          .where("metadatos.activo", "==", true)
          .get();
        if (snapshot.empty) {
          console.info("<<<DEBUG >>> getDirectorio-> NO HAY DATOS...");
          return catalogo;
        }
        if (args.organigrama) {
          catalogo = fnInstantanea2Arreglo(snapshot, { organigrama: true });
          dispatch(
            setMessage(
              `Filtrados los ${catalogo.length} ${c.dire} ACTIVOS del ${getTipo(
                catalogo
              )} que se recibió para el organigrama...`
            )
          );
        } else {
          catalogo = fnInstantanea2Arreglo(snapshot);
          dispatch(
            setMessage(
              `Filtrados los ${catalogo.length} ${c.dire} ACTIVOS del ${getTipo(
                catalogo
              )}...`
            )
          );
        }
      }

      // console.table(`<<<DEBUG>>> getDirectorio-> Tipo[${getTipo(catalogo)}] | ${catalogo.length} Empleados | Catálogo: `, catalogo);
      return { args, catalogo };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  },
  {}
);

const estadoInicial = {
  catalogo: [],
  error: false,
  loading: false,
  message: "",
  seleccion: {},
};

export const dirSlice = createSlice({
  name: "dir",
  initialState: estadoInicial,
  reducers: {
    setSeleccionado(state, action) {
      const { empleado } = action.payload; // Con destructuración
      state.error =
        typeof empleado === "object"
          ? false
          : `OjO - Recibí un ${getTipo(empleado)} y debe ser un objeto...`;
      state.message =
        Object.keys(empleado).length > 0
          ? `${empleado.nombre.corto} seleccionado & asignado...`
          : "Se asignó un objeto en blanco...";
      state.seleccion = typeof empleado === "object" ? empleado : {};
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
  },
  extraReducers: {
    [getDirectorio.pending]: (state) => {
      if (!state.loading) state.loading = true;
      state.catalogo = [];
      state.error = false;
      state.message = "Cargando el catálogo del backend...";
      state.loading = !state.loading && true;
    },
    [getDirectorio.fulfilled]: (state, action) => {
      const { args, catalogo, catAre, catCat } = action.payload;
      // Si no se especifican argumentos o el argumento organigrama es falso...
      if (isEmpty(args) || !args.organigrama) {
        state.message =
          catalogo.length > 0
            ? `Se cargaron con éxito los ${catalogo.length} registros del catálogo de ${c.dire}...`
            : `${capitalizar(c.dire)} NO tiene documentos...`;
        state.catalogo = catalogo;
      } else if (args.organigrama) {
        let _catalogo = orderBy(catalogo, ["adsId", "catId"], ["asc", "asc"]);
        state.message =
          catalogo.length > 0
            ? `Se cargaron con éxito los ${catalogo.length} registros del catálogo de ${c.dire} personalizados para el organigrama...`
            : `${capitalizar(c.dire)} NO tiene documentos...`;
        state.organigrama = _catalogo;
      }
      state.loading = state.loading && false;
    },
    [getDirectorio.rejected]: (state, action) => {
      state.message =
        "ERROR al cargar el catálogo de empleados del backend, ver error...";
      state.error = action.payload;
      state.loading = state.loading && false;
    },
  },
});

/* NOMBRE */
export const { name } = dirSlice.name;

/* ACCIONES
Este método exporta las acciones/métodos definidas en 'slice->reducers' para ser utilizadas posteriormente en la APP. */
export const { setArbol, setSeleccionado, setMessage, setOrganigrama } =
  dirSlice.actions;

/* SELECTORES / GETTERS
Estas funciónes/métodos son selectores(getters) y permiten  acceder a un valor especifico de este reductor/estado.
Los selectores también pueden ser definidos "en línea" en el módulo en donde sean necesitados, usando:
'useSelector((state) => state.<reductor>.<prop>)'
Por lo que la declaración de esta función selectora es opcional.*/

export const selDirectorio = (state) => state.dir.catalogo;
export const getDirSeleccion = (state) => state.dir.seleccion;

/* Exporto el reductor de forma default */
export default dirSlice.reducer;
