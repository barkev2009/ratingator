import React, { useEffect, useState } from 'react'
import { useSetCookie } from '../hooks';
import { COLLECTION_ROUTE } from '../constants';
import BackButton from '../common/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { editItem, getItem } from '../reducers/items';
import styles from '../css/Card.module.css';
import carouselStyles from '../css/Carousel.module.css';
import ControlTags from '../containers/ControlTags';
import { getTags } from '../reducers/tags';
import Carousel from '../components/Carousel';
import { clearError, getAttachments } from '../reducers/attachments';
import AddAttachment from '../components/AddAttachment';
import Rating from '../components/Rating';

const Card = () => {
    useSetCookie();

    const dispatch = useDispatch();
    const location = useLocation();
    const itemId = location.pathname.split('/')[2];
    const itemSelector = useSelector(state => state.items.data.filter(i => i.id === itemId)[0]);
    const tags = useSelector(state => state.tags.data);
    const error = useSelector(state => state.attachments.error);
    const [item, setItem] = useState({});
    const [name, setName] = useState('');
    const [disabled, setDisabled] = useState(true);

    const submitHandler = (e) => {
        e.preventDefault();
        if (name.trim() === null || name.trim() === undefined || name.trim() === '') {
            setName(item.name);
        } else {
            dispatch(editItem({ id: itemId, name: name.trim() }));
            setDisabled(true);
        }
    }

    useEffect(
        () => {
            if (itemId) {
                dispatch(getItem({ id: itemId }));
            }
        }, []
    );
    useEffect(
        () => {
            if (itemSelector) {
                setItem(itemSelector);
                setName(itemSelector.name);
                dispatch(getTags({ collectionId: itemSelector.collectionId }));
                dispatch(getAttachments({ collectionId: itemSelector.collectionId }));
            }
        }, [itemSelector]
    );
    useEffect(
        () => {
            if (item.name) {
                setDisabled(item.name.trim() === name.trim());
            }
        }, [name]
    );
    useEffect(
        () => {
            if (error !== null) {
                setTimeout(() => dispatch(clearError()), 5000);
            }
        }, [error]
    );

    return (
        <div id='card' className={[styles.card, carouselStyles.card].join(' ')}>
            <BackButton route={COLLECTION_ROUTE.replace(':id', item.collectionId)} />
            {error !== null && <div className={styles.error}>{error}</div>}
            <div className={styles.card_container}>
                <div className={styles.carousel_container}>
                    <Carousel itemId={itemId} />
                </div>
                <div>
                    <form onSubmit={submitHandler}>
                        <input className={styles.name} type="text" value={name} onChange={e => setName(e.target.value)} />
                        <button type='submit' disabled={disabled}>SAVE</button>
                    </form>
                    <div className={styles.func_container}>
                        <AddAttachment itemId={itemId} />
                        <Rating item={item} />
                    </div>
                    {item.tags !== undefined && <ControlTags item={item} />}
                </div>
            </div>

        </div>
    )
}

export default Card