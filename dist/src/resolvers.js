'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var baseUrl = 'https://api.fyyd.de/0.2';
var bookUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
var fetch = require('node-fetch');

var resolvers = exports.resolvers = {
    Query: {
        searchPodcast: function searchPodcast(parent, args) {
            var term = args.term;

            return fetch(baseUrl + '/search/podcast?term=' + term).then(function (res) {
                return res.json().then(function (data) {
                    return data.data;
                });
            });
        },
        searchBook: function searchBook(parent, args) {
            var term = args.term;

            return fetch('' + bookUrl + term).then(function (res) {
                return res.json().then(function (data) {
                    return data.items;
                });
            });
        },
        podcast: function podcast(parent, args) {
            var id = args.id;

            return fetch(baseUrl + '/podcast?podcast_id=' + id).then(function (res) {
                return res.json().then(function (data) {
                    return data.data;
                });
            });
        },
        episode: function episode(parent, args) {
            var id = args.id;

            return fetch(baseUrl + '/episode?episode_id=' + id).then(function (res) {
                return res.json().then(function (data) {
                    return data.data;
                });
            });
        }
    },
    Podcast: {
        episodes: function episodes(parent) {
            var id = parent.id;

            return fetch(baseUrl + '/podcast/episodes?podcast_id=' + id + '&count=1000').then(function (res) {
                return res.json().then(function (data) {
                    return data.data.episodes;
                });
            });
        }
    }
};