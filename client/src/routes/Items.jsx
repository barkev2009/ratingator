import React, { useEffect, useState } from 'react'
import { useSetCookie } from '../hooks'
import BackButton from '../common/BackButton';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, clearItems, createItem, getAllItems, getItems, sortByRating as sortByRatingDispatch } from '../reducers/items';
import Item from '../components/Item';
import { COLLECTIONS_ROUTE } from '../constants';
import styles from '../css/Items.module.css';
import { getCookie } from '../utils/cookies';
import { getAttachments } from '../reducers/attachments';
import { getTags } from '../reducers/tags';
import CreateTagButton from '../components/CreateTagButton';
import CollectionTags from '../containers/CollectionTags';
import Error from '../common/Error';
import { useRef } from 'react';

const Items = () => {

    useSetCookie();

    const location = useLocation();
    const dispatch = useDispatch();
    const collectionId = useRef(location.pathname.split('/').slice(-1)[0]);
    const initialItems = useSelector(state => state.items.data);
    const userId = useSelector(state => state.user.user.id);
    const error = useSelector(state => state.items.error);
    const [name, setName] = useState('');
    const [counter, setCounter] = useState(initialItems.length);
    const total = useSelector(state => state.items.total);
    const [sortByRating, setSortByRating] = useState(getCookie('itemsRatingSort') || 'false');
    const [items, setItems] = useState(initialItems);
    const tags = useSelector(state => state.tags.data);
    const [filterTags, setFilterTags] = useState(tags.filter(item => item.active));

    const submitHandler = (e) => {
        e.preventDefault();
        if (name !== '') {
            dispatch(createItem({ name, collectionId: collectionId.current }));
            setName('');
        }
    }
    const inputHandler = (e) => {
        setName(e.target.value);
    }
    const toggleRatingSort = () => {
        dispatch(sortByRatingDispatch(sortByRating === 'true' ? 'false' : 'true'));
        setSortByRating(sortByRating === 'true' ? 'false' : 'true');
        dispatch(clearItems());
        dispatch(getItems({ collectionId: collectionId.current, sortByRating: sortByRating === 'true' ? 'false' : 'true' }));
    }

    useEffect(
        () => {
            if (collectionId.current) {
                dispatch(getItems({ collectionId: collectionId.current, sortByRating }));
                dispatch(getAllItems({ collectionId: collectionId.current }));
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
            if (collectionId.current) {
                dispatch(getAttachments({ collectionId: collectionId.current }));
                dispatch(getTags({ collectionId: collectionId.current }));
            }
        }, [collectionId.current]
    );
    useEffect(
        () => {
            setFilterTags(tags.filter(item => item.active));
        }, [tags]
    );
    useEffect(
        () => {
            if (filterTags.length > 0) {
                setItems(
                    initialItems.filter(
                        item =>
                            item.tags.map(tag => tag.name).length > 0 &&
                            filterTags.map(obj => obj.name).every(
                                elem => item.tags.map(tag => tag.name).includes(elem)
                            )
                    )
                );
            } else {
                setItems(initialItems);
            }
        }, [filterTags, initialItems]
    );
    useEffect(
        () => {
            if (error !== null) {
                setTimeout(() => dispatch(clearError()), 10 * 1000);
            }
        }, [error]
    );


    return (
        <div>
            <div className={styles.upperContainer}>

                {error !== null && <Error error={error} />}
                <form onSubmit={submitHandler} className={styles.formContainer}>
                    <BackButton route={COLLECTIONS_ROUTE.replace(':id', userId)} />
                    <div className={styles.topRow}>
                        <input
                            type="text"
                            value={name}
                            onChange={inputHandler}
                            placeholder="Название..."
                            className={styles.inputField}
                        />
                        <button type="submit" className={styles.createButton}>+</button>
                    </div>

                    <div className={styles.bottomRow}>
                        <div className={styles.counter}>
                            {counter} / {total}
                        </div>
                        <button
                            type="button"
                            className={`${styles.sortButton} ${sortByRating === 'true' ? styles.activeSort : ''}`}
                            onClick={toggleRatingSort}
                        >
                            <span className={styles.sortIcon}>↑↓</span> Рейтинг
                        </button>
                        <CreateTagButton className={styles.tagButton} />
                    </div>
                </form>
                <CollectionTags />
            </div>
            <div className={styles.itemsContainer}>
                {
                    items.map(item => <Item key={item.id} item={item} />)
                }
            </div>
        </div>
    )
}

export default Items