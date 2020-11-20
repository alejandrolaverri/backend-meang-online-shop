import { Db } from 'mongodb';

/**
 * Obtener el ID que vamos a utilizar en el nuevo usuario
 * @param database Base de datos con la que estamos trabajando
 * @param collection Colección donde deseamos buscar el último elemento
 * @param sort Como deseamos ordenarlo { <propiedad>: -1 }
 */
export const asignDocumentId = async (
  database: Db,
  collection: string,
  sort: object = { registerDaye: -1 }
) => {
  // Comprobar el último usuario registrado para asignar ID
  const lastElement = await database
    .collection(collection)
    .find()
    .limit(1)
    .sort(sort)
    .toArray();
  if (lastElement.length === 0) {
    return 1;
  }
  return lastElement[0].id + 1;
};

/**
 * Obtener un elemento de la base de datos
 * @param database Base de datos con la que estamos trabajando
 * @param collection Colección donde deseamos buscar el elemento
 * @param filter Como deseamos filtrar el resultado
 */
export const findOneElement = async (
  database: Db,
  collection: string,
  filter: object
) => {
  return database.collection(collection).findOne(filter);
};

/**
 * Inserción de un elemento en la base de datos
 * @param database Base de datos con la que estamos trabajando
 * @param collection  Colección donde deseamos insertar el elemento
 * @param document elemento a insertar
 */
export const insertOneElement = async (
  database: Db,
  collection: string,
  document: object
) => {
  return await database.collection(collection).insertOne(document);
};

/**
 * Inserción de uno o mas elementos en la base de datos
 * @param database Base de datos con la que estamos trabajando
 * @param collection Colección donde deseamos insertar los elementos
 * @param documents elementos a insertar
 */
export const insertManyElement = async (
  database: Db,
  collection: string,
  documents: Array<object>
) => {
  return await database.collection(collection).insertMany(documents);
};

/**
 * Busqueda de elementos en una colección por filtrado y obtencion en formato array
 * @param database Base de datos con la que estamos trabajando
 * @param collection Colección donde deseamos buscar los elementos
 * @param filter Filtro de busqueda de los elementos
 */
export const findElements = async (
  database: Db,
  collection: string,
  filter: object = {}
) => {
  return await database.collection(collection).find(filter).toArray();
};