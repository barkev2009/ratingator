import React, { useState } from 'react';
import Modal from '../common/Modal';
import styles from '../css/CreateTagButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createTag } from '../reducers/tags';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';

const CreateTagButton = ({ className }) => {
  const [active, setActive] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const tags = useSelector(state => state.tags.data);
  const location = useLocation();
  const collectionId = useRef(location.pathname.split('/').slice(-1)[0]);

  const clickHandler = (e) => {
    e.preventDefault();
    if (name.trim() !== '' && !tags.some(tag => tag.name === name.trim())) {
      dispatch(createTag({ name: name.trim(), collectionId: collectionId.current }));
      setActive(false);
      setName('');
    }
  };

  return (
    <>
      <button
        onClick={() => setActive(true)}
        className={`${styles.button} ${className || ''}`}
        aria-label="Создать тег"
      >
        + Тег
      </button>

      <Modal active={active} setActive={setActive}>
        <div className={styles.modalContent}>
          <h3 className={styles.modalTitle}>Создать тег</h3>
          <input
            type="text"
            placeholder="Введите название тега"
            className={styles.modalInput}
            onChange={(e) => setName(e.target.value.toLowerCase())}
            value={name}
            autoFocus
          />
          <div className={styles.modalButtons}>
            <button
              onClick={clickHandler}
              className={styles.submitButton}
              disabled={!name.trim() || tags.some(tag => tag.name === name.trim())}
            >
              Создать
            </button>
            <button
              onClick={() => setActive(false)}
              className={styles.cancelButton}
            >
              Отмена
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateTagButton;