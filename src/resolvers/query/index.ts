import GMR from 'graphql-merge-resolvers';
import resolversProductsQuery from './product';
import resolversUserQuery from './user';

const queryResolvers = GMR.merge([
    resolversUserQuery,
    resolversProductsQuery
]);

export default queryResolvers;