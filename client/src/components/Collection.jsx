import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCollection } from '../slices/collections';
import { useNavigate } from 'react-router-dom';
import { COLLECTION_ROUTE } from '../constants';
import styles from '../css/Collection.module.css';
import Modal from '../common/Modal';
import Trash from '../svg/Trash';

const Collection = ({ collection }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  const deleteHandler = () => {
    dispatch(deleteCollection({ id: collection.id }));
    setActive(false);
  }
  const clickHandler = () => {
    navigate(COLLECTION_ROUTE.replace(':id', collection.id));
  }

  return (
    <div className={styles.collectionContainer}>
      <div className={styles.collectionName} onClick={clickHandler}>{collection.name}</div>
      <div className={styles.trashContainer} onClick={() => setActive(true)}>
        <Trash />
      </div>
      <Modal active={active} setActive={setActive}>
        <h3>Точно удалить коллекцию?</h3>
        <div className={styles.choiceButtons}>
          <div onClick={deleteHandler}>Да</div>
          <div onClick={() => setActive(false)}>Нет</div>
        </div>
      </Modal>
    </div>
  )
}

export default Collection