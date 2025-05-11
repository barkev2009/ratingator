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

    const submitHandler = (e) => {
        e.preventDefault();
        if (name.trim() !== '') {
            dispatch(createCollection({ name, collectionTypeId, userId }));
            setName('');
        }
    };

    useEffect(() => {
        if (collectionTypeId && userId) {
            dispatch(getCollections({ collectionTypeId, userId }));
        }
    }, [collectionTypeId, userId, dispatch]);

    return (
        <div className={styles.container}>
            <BackButton route={MAIN_ROUTE.replace(':id', userId)} />

            <h1 className={styles.title}>Мои коллекции</h1>

            <form onSubmit={submitHandler} className={styles.createForm}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Название коллекции"
                    className={styles.input}
                    maxLength={50}
                />
                <button type="submit" className={styles.createButton}>
                    Создать
                </button>
            </form>

            <div className={styles.grid}>
                {collections.map(item => (
                    <Collection key={item.id} collection={item} />
                ))}
            </div>
        </div>
    );
};

export default Collections;