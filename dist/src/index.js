'use strict';

var _podcasts = require('./podcasts');

var podcasts = _interopRequireWildcard(_podcasts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _require = require('graphql-yoga'),
    GraphQLServer = _require.GraphQLServer;

var server = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: podcasts.resolvers
});

server.start(function () {
    return console.log('Server is running on http://localhost:4000');
});