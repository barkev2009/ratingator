import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCollectionTypes } from '../reducers/collectionType';
import CollectionType from '../components/CollectionType';
import { useSetCookie } from '../hooks';
import BackButton from '../common/BackButton';
import { AUTH_ROUTE } from '../constants';

const CollectionTypes = () => {

  const dispatch = useDispatch();
  const collectionTypes = useSelector(state => state.collectionType.data);

  useSetCookie();

  useEffect(
    () => {
      if (collectionTypes.length === 0) {
        dispatch(getAllCollectionTypes());
      }
    }, [collectionTypes, dispatch]
  );

  return (
    <div>
      <BackButton route={AUTH_ROUTE} />
      {
        collectionTypes.map(
          ct => <CollectionType collectionType={ct} key={ct.id} />
        )
      }
    </div>
  )
}

export default CollectionTypes