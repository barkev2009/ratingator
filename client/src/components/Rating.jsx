import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editItem } from '../reducers/items';
import styles from '../css/Rating.module.css';

const Rating = ({ item }) => {
    const [rating, setRating] = useState(item.rating);
    const dispatch = useDispatch();

    const changeRating = (delta) => {
        const newRating = rating + delta;
        setRating(newRating);
        dispatch(editItem({ id: item.id, rating: newRating }));
    };

    useEffect(() => {
        setRating(item.rating);
    }, [item]);

    return (
        <div className={styles.ratingContainer}>
            <button
                onClick={() => changeRating(1)}
                className={styles.ratingBtn}
                aria-label="Увеличить рейтинг"
            >
                ↑
            </button>

            <div className={styles.ratingValue}>{rating}</div>

            <button
                onClick={() => changeRating(-1)}
                className={styles.ratingBtn}
                aria-label="Уменьшить рейтинг"
            >
                ↓
            </button>
        </div>
    );
};

export default Rating;