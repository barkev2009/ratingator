import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCollection } from '../slices/collections';
import { useNavigate } from 'react-router-dom';
import { COLLECTION_ROUTE } from '../constants';
import styles from '../css/Collection.module.css';

const Collection = ({ collection }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = () => {
    dispatch(deleteCollection({ id: collection.id }))
  }
  const clickHandler = () => {
    navigate(COLLECTION_ROUTE.replace(':id', collection.id));
  }

  return (
    <div className={styles.collectionContainer}>
      <div onClick={clickHandler}>{collection.name}</div>
      <div onClick={deleteHandler}>DELETE</div>
    </div>
  )
}

export default Collection