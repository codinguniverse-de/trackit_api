const baseUrl = 'https://api.fyyd.de/0.2';
const fetch = require('node-fetch');


export const resolvers = {
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