import React, { useEffect, useState } from 'react';
import { useSetCookie } from '../hooks';
import { COLLECTION_ROUTE } from '../constants';
import BackButton from '../common/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { editItem, getItem } from '../reducers/items';
import styles from '../css/Card.module.css';
import ControlTags from '../containers/ControlTags';
import { getTags } from '../reducers/tags';
import Carousel from '../components/Carousel';
import { getAttachments } from '../reducers/attachments';
import AddAttachment from '../components/AddAttachment';
import Rating from '../components/Rating';
import { useRef } from 'react';

const Card = () => {
    useSetCookie();

    const dispatch = useDispatch();
    const location = useLocation();
    const itemId = useRef(location.pathname.split('/').slice(-1)[0]);
    const itemSelector = useSelector(state => state.items.data.filter(i => i.id === itemId.current)[0]);
    const [item, setItem] = useState({});
    const [name, setName] = useState('');
    const [disabled, setDisabled] = useState(true);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setName(item.name);
        } else {
            dispatch(editItem({ id: itemId.current, name: name.trim() }));
            setDisabled(true);
        }
    };

    useEffect(() => {
        if (itemId.current) {
            dispatch(getItem({ id: itemId.current }));
        }
    }, [itemId, dispatch]);

    useEffect(() => {
        if (itemSelector) {
            setItem(itemSelector);
            setName(itemSelector.name);
            dispatch(getTags({ collectionId: itemSelector.collectionId }));
            dispatch(getAttachments({ collectionId: itemSelector.collectionId }));
        }
    }, [itemSelector, dispatch]);

    useEffect(() => {
        if (item.name) {
            setDisabled(item.name.trim() === name.trim());
        }
    }, [name, item.name]);

    return (
        <div className={styles.cardContainer}>
            <BackButton route={COLLECTION_ROUTE.replace(':id', item.collectionId)} />

            <div className={styles.card}>
                <div className={styles.carouselSection}>
                    <Carousel itemId={itemId.current} />
                </div>

                <div className={styles.detailsSection}>
                    <form onSubmit={submitHandler} className={styles.nameForm}>
                        <input
                            className={styles.nameInput}
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            aria-label="Название элемента"
                        />
                        <button
                            type="submit"
                            className={styles.saveButton}
                            disabled={disabled}
                            aria-disabled={disabled}
                        >
                            Сохранить
                        </button>
                    </form>

                    <div className={styles.controls}>
                        <AddAttachment itemId={itemId.current} />
                        <Rating item={item} />
                    </div>

                    {item.tags && <ControlTags item={item} />}
                </div>
            </div>
        </div>
    );
};

export default Card;