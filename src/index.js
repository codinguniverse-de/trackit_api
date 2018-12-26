const { GraphQLServer } = require('graphql-yoga');
import * as podcasts from "./podcasts" ;


const server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: podcasts.resolvers
});

server.start(() => console.log('Server is running on http://localhost:4000'));