import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/BackButton.module.css';

const BackButton = ({ route }) => {

    const navigate = useNavigate();
    const clickHandler = () => {
        navigate(route);
    }

    return (
        <div onClick={clickHandler} className={styles.buttonContainer}>BackButton</div>
    )
}

export default BackButton