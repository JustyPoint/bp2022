import firebase from "firebase/app";
import "@firebase/auth";
// import '@firebase/database'; // No ocupo... 5-07-2021
import "@firebase/firestore";
import "@firebase/functions";
import "@firebase/storage";
import { omit, isEmpty } from "lodash";

import { configFB } from "../config";

export const collections = {
  dire: "rc_directory",
  feed: "rc_feed",
  foro: "rc_forums",
  noti: "rc_notifications",
  podc: "rc_podcast",
};

const valido = configFB && configFB.apiKey && configFB.projectId;

const firebaseApp = valido && firebase.initializeApp(configFB);
const firebaseAuth = valido && firebase.auth;

class AyudanteFirebase {
  esValido = valido;
  AUTH = firebase.auth();
  EMAIL = "email";
  FACEBOOK = "facebook";
  GOOGLE = "google";
  GITHUB = "github";
  TWITTER = "twitter";

  constructor() {
    firebase.firestore().enablePersistence();
    this.bd = this.esValido && firebase.firestore(); // Firestore
    // this.fdb = this.esValido && firebase.database(); // ¿Se ocupará?
    this.fs = this.esValido && firebase.firestore;
    this.storage = this.esValido && firebase.storage();
    this.funcs = this.esValido && firebase.functions();
    this.serverts =
      this.esValido && firebase.firestore.FieldValue.serverTimestamp; // Server timestamp
  }
  crearLote = () => {
    return this.bd.batch();
  };
  conectarse = (proveedor, objDatos) => {
    if (!this.esValido) {
      return;
    }
    switch (proveedor) {
      case this.EMAIL:
        return firebaseAuth().signInWithEmailAndPassword(
          objDatos.email,
          objDatos.password
        );
      case this.FACEBOOK:
        return new firebaseAuth.FacebookAuthProvider();
      case this.GOOGLE:
        return new firebaseAuth.GoogleAuthProvider();
      case this.GITHUB:
        return new firebaseAuth.GithubAuthProvider();
      case this.TWITTER:
        return new firebaseAuth.TwitterAuthProvider();
      default:
    }
  };
  desconectarse = () => {
    return firebaseAuth().signOut();
  };
  /**
   * Método que elimina de FirebaseAuth al usuario actual.
   * @returns Una promesa al eliminar al usuario actual del sistema de autentificación. */
  eliminar = () => {
    return firebaseAuth().currentUser.delete();
  };
  /**
   * Método que regresa la sesión AUTH actual del usuario ó NULL si ésta no éxiste.
   * @returns {Object} Objeto javascript con los datos de la sesión | NULL. */
  getSesionUsuario = () => {
    return firebaseAuth().currentUser ? firebaseAuth().currentUser : null;
  };
  /**
   * Método que regresa un objeto usuario con los cambios en la sesión.
   * @returns {Object} Objeto javascript con los datos de la sesión | NULL. */
  alCambiarUsuario = () => {
    firebaseAuth().onAuthStateChanged((usuario) => {
      return usuario ? usuario : null;
    });
  };
  /**
   * Método que regresa el ID de la sesión AUTH actual ó NULL si ésta no éxiste.
   * @returns {String} String con el ID de la sesión | NULL. */
  getSesionId = () => {
    return this.AUTH.currentUser.uid ? this.AUTH.currentUser.uid : null;
  };
  /**
   * Método que regresa el EMAIL de la sesión AUTH actual ó NULL si éste no éxiste.
   * @returns {String} String con el EMAIL de la sesión | NULL. */
  getSesionEmail = () => {
    return this.AUTH.currentUser.email ? this.AUTH.currentUser.email : null;
  };
  resetearPassword = (email) => {
    return firebaseAuth().sendPasswordResetEmail(email);
  };
  //  let _pid = bd.collection(C.usuarios).doc(sesion.currentUser.uid).collection(C.privados).doc().id;
  /** Crea/regresa un Firestore ID aleatorio. */
  getFirestoreID = () => {
    return this.bd.ref().push().key;
  };
  /** Crea/regresa un Database ID aleatorio. */
  getDatabaseID = () => {
    return firebase.database().ref().push().key;
  };
  /** Método que devuelve un GeoPunto-Firestore en base a una latitud | longitud dada */
  geoPunto = (lat, lon) => {
    return new firebase.firestore.GeoPoint(lat, lon);
  };
  /** Método que devuelve un objeto Firestore Timestamp que contiene la fecha de este preciso momento.
   * @returns {objeto} {seconds: numero, nanoseconds: numero } */
  fechaAhora = () => {
    return firebase.firestore.Timestamp.now();
  };
  /** Método que devuelve un Timestamp Firestore en base a un objeto Date.
   * @param {Date} fecha [opcional] Si no se especifica se regresa new Date().
   * @returns {Object} Timestamp: {_seconds: numero, _nanoseconds: numero } */
  fechaEspecifica = (fecha = new Date()) => {
    return firebase.firestore.Timestamp.fromDate(fecha);
  };
  /**
   * Método que convierte un snapshot de Firestore en un objeto-colección(key:value).
   * @param {Object} instantanea Objeto iterable con los documentos de una colección Firestore.
   * @returns {Object} Objeto colección con notación KEY:VALUES.
   * @example let datos = fnInstantanea2Objeto(snapshot);
   * console.info(JSON.stringify(datos));
   * {
   * DG: {
   * activa: true,
   * descripcion: 'Prueba',
   * }, ...
   * }*/
  fnInstantanea2Objeto = (instantanea) => {
    try {
      let datos = {};
      instantanea.forEach((documento) => {
        datos = {
          ...datos,
          [documento.id]: documento.data(),
        };
      });
      return datos;
    } catch (error) {
      throw `firebase->fnInstantanea2Objeto | ERROR[${error}]`;
    }
  };
  /**
   * Método que convierte un snapshot de Firestore en un arreglo de objetos.
   * @param {Object} instantanea Objeto iterable con los documentos de una colección Firestore.
   * @param {Object} opciones Objeto con las opciones de procesamiento.
   * @returns {Array} Arreglo de objetos JS con la propiedad id incluida. */
  fnInstantanea2Arreglo = (instantanea, opciones = {}) => {
    try {
      let coleccion = [];
      if (isEmpty(opciones)) {
        instantanea.docs.forEach((documento) => {
          let objDatos = omit(documento.data(), ["catRef"]); // Asigno todas las propiedades del documento a un objeto.
          objDatos.key = documento.id; // Adiciono la propiedad ID al objeto.
          coleccion.push(objDatos); // Empujo el objeto con los datos de la colección al arreglo.
        });
      }
      if (opciones.organigrama) {
        instantanea.docs.forEach((documento) => {
          let objOrganigrama = {
            id: documento.data().empId,
            adsId: documento.data().adsId,
            adscritoA: "",
            areId: documento.data().areId,
            catId: documento.data().catId,
            categoria: "",
            key: documento.id,
            name: `${documento.data().nombre.apellidos} ${
              documento.data().nombre.pila
            }`,
            tarjetaActiva: documento.data().metadatos.tarjetaActiva || null,
            title: documento.data().titulo,
            persona: {
              apodo: documento.data().nombre.apodo,
              avatar: documento.data().foto,
              corto: documento.data().nombre.corto,
              curp: documento.data().CURP,
              docId: documento.id,
              email: documento.data().email[0].correo,
              estadoCivil: documento.data().metadatos.estadoCivil,
              genero: documento.data().genero,
              link: documento.data().metadatos.liga
                ? documento.data().metadatos.liga
                : `${window.location.origin}/?u=${documento.id}`,
              nombre: documento.data().nombre.completo,
              particular: documento.data().metadatos.particular || false,
              prefijo: documento.data().nombre.prefijo || null,
              rfc: documento.data().RFC,
              secretaria: documento.data().metadatos.secretaria || false,
              telefonos: documento.data().telefono,
              title: documento.data().titulo,
              subordinados: documento.data().metadatos.subordinados,
              subordinadosMostrar:
                documento.data().metadatos.subordinadosMostrar,
              totalACargo: 0,
            },
            children: [],
          };
          coleccion.push(objOrganigrama); // Empujo el objeto al arreglo.
        });
      }
      return coleccion; // Al terminar validaciones regreso el arreglo con o sín los datos obtenidos.
    } catch (error) {
      throw `firebase->fnInstantanea2Arreglo | ERROR[${error}]`;
    }
  };
}

export default new AyudanteFirebase();
