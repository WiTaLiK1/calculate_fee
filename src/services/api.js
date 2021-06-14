const axios = require('axios');

const { API_BASE_URL } = require('../settings/contsants');

const axiosInstance = axios.create({ baseURL: API_BASE_URL });

const api = (...params) => axiosInstance(...params).then(({ data }) => data);

module.exports = api;
