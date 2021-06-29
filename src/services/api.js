import axios from 'axios';

import { API_BASE_URL } from '../settings/contsants.js';

const axiosInstance = axios.create({ baseURL: API_BASE_URL });

const api = (...params) => axiosInstance(...params).then(({ data }) => data);

export default api;
