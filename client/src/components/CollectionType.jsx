import React from 'react';
import styles from '../css/CollectionType.module.css';
import { useNavigate } from 'react-router-dom';
import { COLLECTIONS_ROUTE } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setCurType } from '../reducers/collections';

const CollectionType = ({ collectionType }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);

    const clickHandler = () => {
        navigate(COLLECTIONS_ROUTE.replace(':id', user.id));
        dispatch(setCurType(collectionType.id));
    }

    return (
        <div className={styles.collectionType} onClick={clickHandler}>
            {collectionType.name}
        </div>
    )
}

export default CollectionType