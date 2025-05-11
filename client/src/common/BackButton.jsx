import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/BackButton.module.css';

const BackButton = ({ route, label = 'Назад' }) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(route)}
            className={styles.backButton}
            aria-label={label}
        >
            <div className={styles.arrowWrapper}>
                <span className={styles.arrow}></span>
            </div>
            <span className={styles.text}>{label}</span>
        </button>
    );
};

export default BackButton;