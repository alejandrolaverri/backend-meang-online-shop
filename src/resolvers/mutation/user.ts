import { asignDocumentId, findOneElement, insertOneElement } from './../../lib/db-operations';
import { COLLECTIONS } from './../../config/constants';
import { IResolvers } from 'graphql-tools';
import bcrypt from 'bcrypt';

const resolversUserMutation: IResolvers = {
    Mutation: {
        async register(_, { user }, { db }) {
            // Comprobar que el usuario no existe
            const userCheck = await findOneElement(db, COLLECTIONS.USERS, { email: user.email });
            
            if (userCheck !== null) {
                return {
                    status: false,
                    message: `El email ${user.email} esta registrado y no puedes registrarte con este email`,
                    user: null
                };
            }
            
            // Comprobar el último usuario registrado para asignar ID
            user.id = await asignDocumentId(db, COLLECTIONS.USERS, { registerDate: -1 });

            // Asignar la fecha en formato ISO en la propiedad registerDate
            user.registerDate = new Date().toISOString();

            //Encriptar password
            user.password = bcrypt.hashSync(user.password, 10);
            
            // Guardar el documento (registro) en la colleción
            return await insertOneElement(db, COLLECTIONS.USERS, user)
                           .then(
                               async () => {
                                    return {
                                        status: true,
                                        message: `El usuario con el email ${user.email} esta registrado correctamente`,
                                        user
                                    };
                               }
                           ).catch((err: Error) => {
                               console.log(err.message);
                               return {
                                    status: false,
                                    message: `Error inesperado, prueba de nuevo.`,
                                    user: null
                                };
                           });
        }
    }
};

export default resolversUserMutation;