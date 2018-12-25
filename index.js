const { GraphQLServer } = require('graphql-yoga');
const baseUrl = 'https://api.fyyd.de/0.2';
const fetch = require('node-fetch');


const typeDefs = `
    type Query {
        users: [User!]!
        user(id: ID!): User
        posts: [Post!]!
        post(id: ID!): Post
    }
  
    type User {
        id: ID!
        name: String!
        posts: [Post!]!
    }
  
    type Post {
        id: ID!
        title: String!
        content: String!
        published: Boolean!
        author: User!
    }
`;

const resolvers = {
    Query: {
        search: (parent, args) => {
            const { term } = args;
            console.log(`${baseUrl}/search/podcast?term=${term}`);
            return fetch(`${baseUrl}/search/podcast?term=${term}`).then(res => {
                return res.json().then(data => data.data);
            });
        },
        podcast: (parent, args) => {
            const { id } = args;
            return fetch(`${baseUrl}/podcast?podcast_id=${id}`).then(res => {
                return res.json().then(data => data.data);
            });
        },
        episode: (parent, args) => {
            const { id } = args;
            return fetch(`${baseUrl}/episode?episode_id=${id}`).then(res => {
                return res.json().then(data => data.data);
            });
        }
    },
    Podcast: {
        episodes: parent => {
            const { id } = parent;
            return fetch(`${baseUrl}/podcast/episodes?podcast_id=${id}&count=1000`).then(res => {
                return res.json().then(data => data.data.episodes);
            });
        },
    }
}
const server = new GraphQLServer({
    typeDefs: './podcasts/podcast_type.graphql',
    resolvers
});

server.start(() => console.log('Server is running on http://localhost:4000'));