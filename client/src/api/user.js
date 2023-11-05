import { jwtDecode } from 'jwt-decode';
import { $authHost, $host } from '../web';
import { setCookie } from '../utils/cookies';

export const register = async (login, password) => {
    const { data } = await $host.post('api/user/register', { login, password });
    setCookie(process.env.REACT_APP_LOCAL_STORAGE_KEY, data.token);
    return jwtDecode(data.token);
}

export const loginAPI = async (login, password) => {
    const { data } = await $host.post('api/user/login', { login, password });
    setCookie(process.env.REACT_APP_LOCAL_STORAGE_KEY, data.token);
    return jwtDecode(data.token);
}

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth');
    setCookie(process.env.REACT_APP_LOCAL_STORAGE_KEY, data.token);
    return jwtDecode(data.token);
}