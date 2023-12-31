import React, { useEffect, useState } from 'react'
import { useSetCookie } from '../hooks'
import BackButton from '../common/BackButton';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createItem, getItems, sortByRating } from '../reducers/items';
import Item from '../components/Item';
import { COLLECTIONS_ROUTE } from '../constants';
import styles from '../css/Items.module.css';
import { getCookie } from '../utils/cookies';
import { getAttachments } from '../reducers/attachments';

const Items = () => {

    useSetCookie();

    const location = useLocation();
    const dispatch = useDispatch();
    const collectionId = location.pathname.split('/')[2];
    const initialItems = useSelector(state => state.items.data);
    const userId = useSelector(state => state.user.user.id);
    const [name, setName] = useState('');
    const [counter, setCounter] = useState(initialItems.length);
    const [items, setItems] = useState(initialItems);
    const [sortedByRating, setSortedByRating] = useState(getCookie('itemsRatingSort') || 'false');

    const clickHandler = () => {
        if (name !== '') {
            dispatch(createItem({ name, collectionId }));
            setName('');
        }
    }
    const sumbitHandler = (e) => {
        e.preventDefault();
        clickHandler();
    }
    const inputHandler = (e) => {
        setName(e.target.value);
    }
    const toggleRatingSort = () => {
        dispatch(sortByRating(sortedByRating === 'true' ? 'false': 'true'));
        setSortedByRating(sortedByRating === 'true' ? 'false': 'true');
    }

    useEffect(
        () => {
            if (collectionId) {
                dispatch(getItems({ collectionId }));
            }
        }, []
    );
    useEffect(
        () => {
            setItems(initialItems);
            setCounter(initialItems.length);
        }, [initialItems]
    );
    useEffect(
        () => {
            if (name.length >= 3) {
                setItems(initialItems.filter(item => item.name.toLowerCase().includes(name.toLowerCase())));
            } else {
                setItems(initialItems);
            }
        }, [name]
    );
    useEffect(
        () => {
            dispatch(getAttachments({ collectionId }));
        }, [collectionId]
    );

    return (
        <div>
            <BackButton route={COLLECTIONS_ROUTE.replace(':id', userId)} />
            <form onSubmit={sumbitHandler} className={styles.inputContainer}>
                <button onClick={clickHandler}>CREATE</button>
                <input value={name} onChange={inputHandler} />
                <div style={{ marginLeft: '10px', top: '7px', position: 'relative' }}>{`Пунктов: ${counter}`}</div>
                <div className={styles.ratingSort} style={{ borderColor: sortedByRating === 'true' ? 'green' : 'red' }} onClick={toggleRatingSort}>Sort by rating</div>
            </form>
            <div className={styles.itemsContainer}>
                {
                    items.map(item => <Item key={item.id} item={item} openVK={getCookie('openVK') === 'true'} />)
                }
            </div>
        </div>
    )
}

export default Items