const baseUrl = 'https://api.fyyd.de/0.2';
const fetch = require('node-fetch');

const resolvers = {
    Query: {
        search: (parent, args) => {
            const { term } = args;
            return fetch(`${baseUrl}/search/podcast?term=${term}`).then(res => {
                let response = res.json();
                return response.data;
            });
        },
        podcast: (parent, args) => {
            const { id } = args;
            return fetch(`${baseUrl}/podcast?podcast_id=${id}`).then(res => res.json());
        },
        episode: (parent, args) => {
            const { id } = args;
            return fetch(`${baseUrl}/episode?episode_id=${id}`).then(res => res.json());
        }
    },
    Podcast: {
        episodes: parent => {
            const { id } = parent;
            return fetch(`${baseUrl}/podcast/episodes?podcast_id=${id}`).then(res => res.json());
        },
    }
}