import React, { useEffect, useState } from 'react'
import { useItemsIntersectionObserver, useSetCookie } from '../hooks'
import BackButton from '../common/BackButton';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearItems, createItem, getAllItems, getItems, sortByRating as sortByRatingDispatch } from '../reducers/items';
import Item from '../components/Item';
import { COLLECTIONS_ROUTE } from '../constants';
import styles from '../css/Items.module.css';
import { getCookie } from '../utils/cookies';
import { getAttachments } from '../reducers/attachments';
import { getTags } from '../reducers/tags';
import CreateTagButton from '../components/CreateTagButton';
import CollectionTags from '../containers/CollectionTags';
import { getItemsAPI } from '../api/items';

const Items = () => {

    useSetCookie();

    const LIMIT = 10;
    const location = useLocation();
    const dispatch = useDispatch();
    const collectionId = location.pathname.split('/')[2];
    const initialItems = useSelector(state => state.items.data);
    const userId = useSelector(state => state.user.user.id);
    const [scrollCounter, setScrollCounter] = useState(0);
    const [name, setName] = useState('');
    const [counter, setCounter] = useState(initialItems.length);
    const total = useSelector(state => state.items.total);
    const [sortByRating, setSortByRating] = useState(getCookie('itemsRatingSort') || 'false');
    const [items, setItems] = useState(initialItems);
    const tags = useSelector(state => state.tags.data);
    const [filterTags, setFilterTags] = useState(tags.filter(item => item.active));

    const sumbitHandler = (e) => {
        e.preventDefault();
        if (name !== '') {
            dispatch(createItem({ name, collectionId }));
            setName('');
        }
    }
    const inputHandler = (e) => {
        setName(e.target.value);
    }
    const toggleRatingSort = () => {
        dispatch(sortByRatingDispatch(sortByRating === 'true' ? 'false' : 'true'));
        setSortByRating(sortByRating === 'true' ? 'false' : 'true');
        setScrollCounter(0);
        dispatch(clearItems());
        dispatch(getItems({ collectionId, sortByRating: sortByRating === 'true' ? 'false' : 'true' }));
    }

    // useItemsIntersectionObserver(setScrollCounter, LIMIT * scrollCounter, total);
    // useEffect(
    //     () => {
    //         if (scrollCounter >= 0) {
    //             console.log('COUNTER CHANGED: ' + scrollCounter);
    //             if (LIMIT * scrollCounter < total) {
    //                 dispatch(getItems({ collectionId, limit: LIMIT, offset: LIMIT * scrollCounter, sortByRating }));
    //             }
    //         }
    //     }, [scrollCounter]
    // );
    useEffect(
        () => {
            if (collectionId) {
                dispatch(getItems({ collectionId, sortByRating }));
                // dispatch(getItems({ collectionId, limit: LIMIT, offset: LIMIT * scrollCounter, sortByRating }));
                dispatch(getAllItems({ collectionId }));
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
            if (collectionId) {
                dispatch(getAttachments({ collectionId }));
                dispatch(getTags({ collectionId }));
            }
        }, [collectionId]
    );
    useEffect(
        () => {
            setFilterTags(tags.filter(item => item.active));
        }, [tags]
    );
    useEffect(
        () => {
            if (filterTags.length > 0) {
                // setScrollCounter(-1);
                // getItemsAPI({ collectionId, tags: filterTags.map(i => i.id) }).then(
                //     resp => { console.log(resp); setItems(resp) }
                // )
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
                // setScrollCounter(0);
            }
        }, [filterTags, initialItems]
    );

    return (
        <div style={{ padding: '10px' }}>
            <BackButton route={COLLECTIONS_ROUTE.replace(':id', userId)} />
            <form onSubmit={sumbitHandler} className={styles.inputContainer}>
                <button type='submit'>CREATE</button>
                <input style={{ width: "70%" }} value={name} onChange={inputHandler} />
                <div style={{ marginLeft: '10px', top: '7px', position: 'relative', marginBottom: '10px' }}>{`Пунктов: ${counter} / ${total}`}</div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div className={styles.ratingSort} style={{ borderColor: sortByRating === 'true' ? 'green' : 'red' }} onClick={toggleRatingSort}>Sort by rating</div>
                    <CreateTagButton />
                </div>
            </form>
            <CollectionTags />
            <div className={styles.itemsContainer}>
                {
                    items.map(item => <Item key={item.id} item={item} />)
                }
            </div>
        </div>
    )
}

export default Items