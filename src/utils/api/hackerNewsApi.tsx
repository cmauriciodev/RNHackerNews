import axios from 'axios';

export const hackerNewsApi = axios.create({
    baseURL: 'https://hn.algolia.com/api/v1/',
});
