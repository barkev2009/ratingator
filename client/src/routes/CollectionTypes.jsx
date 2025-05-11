import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCollectionTypes } from '../reducers/collectionType';
import CollectionType from '../components/CollectionType';
import { useSetCookie } from '../hooks';
import BackButton from '../common/BackButton';
import { AUTH_ROUTE } from '../constants';
import styles from '../css/CollectionTypes.module.css';

const CollectionTypes = () => {
  const dispatch = useDispatch();
  const collectionTypes = useSelector(state => state.collectionType.data);

  useSetCookie();

  useEffect(() => {
    if (collectionTypes.length === 0) {
      dispatch(getAllCollectionTypes());
    }
  }, [collectionTypes, dispatch]);

  return (
    <div className={styles.container}>
      <BackButton route={AUTH_ROUTE} />
      <h1 className={styles.title}>Типы коллекций</h1>
      <div className={styles.grid}>
        {collectionTypes.map(ct => (
          <CollectionType collectionType={ct} key={ct.id} />
        ))}
      </div>
    </div>
  );
};

export default CollectionTypes;