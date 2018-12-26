const baseUrl = 'https://api.fyyd.de/0.2';
const bookUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
const fetch = require('node-fetch');


export const resolvers = {
    Query: {
        searchPodcast: (parent, args) => {
            const { term } = args;
            return fetch(`${baseUrl}/search/podcast?term=${term}`).then(res => {
                return res.json().then(data => data.data);
            });
        },
        searchBook: (parent, args) => {
            const { term } = args;
            return fetch(`${bookUrl}${term}`).then(res => {
                return res.json().then(data => data.items);
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