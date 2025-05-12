import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCollection } from '../reducers/collections';
import { useNavigate } from 'react-router-dom';
import { COLLECTION_ROUTE } from '../constants';
import styles from '../css/Collection.module.css';
import Modal from '../common/Modal';
import { setCookie } from '../utils/cookies';
import TrashIcon  from '../svg/Trash';

const Collection = ({ collection }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  const deleteHandler = () => {
    dispatch(deleteCollection({ id: collection.id }));
    setActive(false);
  };

  const clickHandler = () => {
    navigate(COLLECTION_ROUTE.replace(':id', collection.id));
    setCookie('openVK', collection.name.toLowerCase() === 'pornstars');
  };

  return (
    <div className={styles.card}>
      <div className={styles.content} onClick={clickHandler}>
        <h3 className={styles.name}>{collection.name}</h3>
      </div>

      <button
        className={styles.deleteButton}
        onClick={(e) => {
          e.stopPropagation();
          setActive(true);
        }}
        aria-label="Удалить коллекцию"
      >
        <TrashIcon className={styles.trashIcon} />
      </button>

      <Modal active={active} setActive={setActive}>
        <h3 className={styles.modalTitle}>Удалить коллекцию?</h3>
        <p className={styles.modalText}>Вы уверены, что хотите удалить коллекцию "{collection.name}"?</p>
        <div className={styles.modalButtons}>
          <button
            className={styles.modalConfirm}
            onClick={deleteHandler}
          >
            Удалить
          </button>
          <button
            className={styles.modalCancel}
            onClick={() => setActive(false)}
          >
            Отмена
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Collection;