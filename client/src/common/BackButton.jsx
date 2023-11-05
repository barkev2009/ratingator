import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/BackButton.module.css';
import ArrowBack from '../svg/ArrowBack';

const BackButton = ({ route }) => {

    const navigate = useNavigate();
    const clickHandler = () => {
        navigate(route);
    }

    return (
        <div onClick={clickHandler} className={styles.buttonContainer}>
            <ArrowBack />
        </div>
    )
}

export default BackButton