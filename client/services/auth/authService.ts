import { AxiosError } from 'axios';
import api from '../../api/api';
import { AuthData } from './types';
import { setItem } from '../storage/storageService';

export const signUp = async (signUpData: AuthData) => {
    try {
        const response = await api.post('/auth/signup', signUpData);
        const { accessToken } = response.data;

        return setItem('accessToken', accessToken);
    } catch (err) {
        if (err instanceof AxiosError) {
            throw new Error(err.response?.data.message);
        } else {
            throw new Error('An error occurred while signing up');
        }
    }
};
