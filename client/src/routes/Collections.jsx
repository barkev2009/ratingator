import { useDispatch, useSelector } from 'react-redux';
import { useSetCookie } from '../hooks';
import { createCollection, getCollections } from '../reducers/collections';
import { getCookie } from '../utils/cookies';
import { useEffect, useState } from 'react';
import Collection from '../components/Collection';
import BackButton from '../common/BackButton';
import { MAIN_ROUTE } from '../constants';
import styles from '../css/Collections.module.css';

const Collections = () => {

    useSetCookie();

    const dispatch = useDispatch();
    const collections = useSelector(state => state.collections.data);
    const userId = useSelector(state => state.user.user.id);
    const collectionTypeId = getCookie('curType');
    const [name, setName] = useState('');

    const sumbitHandler = (e) => {
        e.preventDefault();
        if (name !== '') {
            dispatch(createCollection({ name, collectionTypeId, userId }));
            setName('');
        }
    }

    useEffect(
        () => {
            if (collectionTypeId && userId) {
                dispatch(getCollections({ collectionTypeId, userId }));
            }
        }, []
    );

    return (
        <div>
            <BackButton route={MAIN_ROUTE.replace(':id', userId)} />
            <form onSubmit={sumbitHandler} className={styles.inputContainer}>
                <button type='submit'>CREATE</button>
                <input value={name} onChange={e => setName(e.target.value)} />
            </form>
            <div className={styles.collectionsContainer}>
                {
                    collections.map(
                        item => <Collection key={item.id} collection={item} />
                    )
                }
            </div>
        </div>
    )
}

export default Collections