import React, { useEffect, useState } from 'react';
import styles from '../css/Rating.module.css';
import { useDispatch } from 'react-redux';
import { editItem } from '../reducers/items';

const Rating = ({ item }) => {

    const [rating, setRating] = useState(item.rating);
    const dispatch = useDispatch();
    const increment = () => {
        setRating(rating + 1);
        dispatch(editItem({ id: item.id, rating: rating + 1 }));
    }
    const decrement = () => {
        setRating(rating - 1);
        dispatch(editItem({ id: item.id, rating: rating - 1 }));
    }
    useEffect(
        () => {
            if (item) {
                setRating(item.rating)
            }
        }, [item]
    );

    return (
    <div className={document.getElementById('card') ? styles.ratingContainer : ""}>
            <div className={styles.ratingControl} onClick={increment}>+</div>
            <div className={styles.ratingValue}>{rating}</div>
            <div className={styles.ratingControl} onClick={decrement}>-</div>
        </div>
    )
}

export default Rating