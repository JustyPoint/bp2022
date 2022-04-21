/**
 * Componente JSX que exhibe los componentes que envuelve si la condición es verdadera.
 * @prop {condicion} Expresión lógica a evaluar para ejecutar el código envuelto.
 * @prop {children} Componente(s) a mostrar si la condición se cumple.
 * @example <ExhibiciónCondicional condicion={estaVacio(datos)}>
 * <Cargador />
 * <ExhibiciónCondicional/>*/
export const ExhibicionCondicional = ({ condicion, children }) =>
  condicion ? children : null;

/**
 * Método que hace esperar la ejecución del código X milisegundos.
 * @param {Number} ms Milisegundos a esperar.
 * @returns Promesa para encadenar el método. */
export const espera = async (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Método que evalúa el objeto dado y determina su tipo.
 * @param obj Cualquier tipo de objeto de datos.
 * @returns {type} "array" | "number" | "object" | "string" */
export const getTipo = function (obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase();
};
/**
 * Método que determina si el tipo de objeto de datos dado, es un objeto o un arreglo.
 * @param evalua Objeto de datos a ser evaluado.
 * @returns {bolean} true ó false */
export const objetoOarreglo = function (evalua) {
  return evalua instanceof Object || getTipo(evalua) === "array";
};

export const extender = (a, b) => {
  for (var key in b) {
    if (b.hasOwnProperty(key)) {
      a[key] = b[key];
    }
  }
  return a;
};

/**
 * esPromesa() - Determina si un método tiene una promesa.
 * @param objeto - Método a ser evaluado.
 * @returns {boleano} Retorna true o false. */
export function esPromesa(objeto) {
  return (
    !!objeto &&
    (typeof objeto === "object" || typeof objeto === "function") &&
    typeof objeto.then === "function"
  );
}

/**
 * Método que devuelve un número entero o decimal aleatorio en base a los parámetros especificados.
 * Si no se especifican éstos parámetros se utiliza por default min=1, max=10 y decimal=false.
 * @param {Number} min Número mínimo, default 0.
 * @param {Number} max Número máximo, default 10.
 * @param {Boolean} decimal Activa o desactiva el resultado decimal.
 * @returns Un numero entero o decimal.  */
export const getAleatorio = (min = 0, max = 10, decimal = false) => {
  try {
    if (decimal) {
      return (Math.random() * (max - min + 1) + min).toFixed(2);
    } else {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  } catch (error) {
    console.error("utilidades->getAleatorio() ", error);
  }
};

/**
 * Metodo para capitalizar un texto. Es decir cambia el primer caracter del mismo a mayúsculas.
 * @example let nombre = capitalizar('andrés); // Andrés */
export const capitalizar = (str = "") =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : false;
