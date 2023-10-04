import axios, {
    AxiosError,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
} from 'axios';
import { getItem } from '../services/storage/storageService';

const baseURL = 'http://127.0.0.1:5300';

const api = axios.create({
    baseURL,
});

const addAuthToken = (config: InternalAxiosRequestConfig) => {
    const token = getItem('accessToken');
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

api.interceptors.request.use(addAuthToken);

export default api;
