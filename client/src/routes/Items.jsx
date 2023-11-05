import React, { useEffect, useState } from 'react'
import { useSetCookie } from '../hooks'
import BackButton from '../common/BackButton';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createItem, getItems } from '../slices/items';
import Item from '../components/Item';
import { COLLECTIONS_ROUTE } from '../constants';
import styles from '../css/Items.module.css';

const Items = () => {

    useSetCookie();

    const location = useLocation();
    const dispatch = useDispatch();
    const collectionId = location.pathname.split('/')[2];
    const items = useSelector(state => state.items.data);
    const userId = useSelector(state => state.user.user.id);
    const [name, setName] = useState('');

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

    useEffect(
        () => {
            if (collectionId) {
                dispatch(getItems({ collectionId }));
            }
        }, []
    );

    return (
        <div>
            <BackButton route={COLLECTIONS_ROUTE.replace(':id', userId)} />
            <form onSubmit={sumbitHandler} className={styles.inputContainer}>
                <button onClick={clickHandler}>CREATE</button>
                <input value={name} onChange={e => setName(e.target.value)} />
            </form>
            <div className={styles.itemsContainer}>
                {
                    items.map(item => <Item key={item.id} item={item} />)
                }
            </div>
        </div>
    )
}

export default Items