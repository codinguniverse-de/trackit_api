'use strict';

var _resolvers = require('./resolvers');

var _require = require('graphql-yoga'),
    GraphQLServer = _require.GraphQLServer;

var server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: _resolvers.resolvers
});

server.start(function () {
    return console.log('Server is running on http://localhost:4000');
});