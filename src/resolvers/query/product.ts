import { IResolvers } from 'graphql-tools';

const resolversProductsQuery: IResolvers = {
    Query: {
        products() {
            return true;
        }
    }
};

export default resolversProductsQuery;