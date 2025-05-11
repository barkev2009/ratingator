import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AUTH_ROUTE, MAIN_ROUTE, REGISTER_ROUTE } from '../constants';
import { loginAPI, register } from '../api/user';
import { setIsAuth, setUser } from '../reducers/user';
import styles from '../css/Auth.module.css';

const Auth = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [passVisible] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isLogin = location.pathname === AUTH_ROUTE;

    const logIn = async () => {
        try {
            let user;
            if (isLogin) {
                user = await loginAPI(login, password);
            } else {
                user = await register(login, password);
            }
            dispatch(setUser(user));
            dispatch(setIsAuth(true));
            setError(null);
            navigate(MAIN_ROUTE.replace(':id', user.id));
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className={styles.container}>
            {error && <div className={styles.error}>{`Ошибка: ${error}`}</div>}
            <h2 className={styles.title}>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>

            <div className={styles.formGroup}>
                <input
                    type="text"
                    placeholder="Введите логин..."
                    className={styles.input}
                    onChange={e => setLogin(e.target.value)}
                    value={login}
                />
            </div>

            <div className={styles.formGroup}>
                <input
                    type={passVisible ? "text" : "password"}
                    placeholder="Введите пароль..."
                    className={styles.input}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
            </div>

            <button
                type="button"
                className={styles.button}
                onClick={logIn}
            >
                {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>

            <div className={styles.links}>
                {isLogin ? (
                    <div>Нет аккаунта? <NavLink to={REGISTER_ROUTE} className={styles.link}>Зарегистрируйся!</NavLink></div>
                ) : (
                    <div>Есть аккаунт? <NavLink to={AUTH_ROUTE} className={styles.link}>Авторизуйся!</NavLink></div>
                )}
            </div>

        </div>
    );
};

export default Auth;