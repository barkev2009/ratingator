import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../slices/items';
import styles from '../css/Item.module.css';
import Modal from '../common/Modal';
import Trash from '../svg/Trash';

const Item = ({ item, openVK }) => {

  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const deleteHandler = () => {
    dispatch(deleteItem({ id: item.id }))
  }
  const hrefHandler = () => {
    if (openVK) {
      const q = item.name.replace(' ', '%20');
      window.open(`https://vk.com/video?notsafe=1&q=${q}`, '_blank', 'rel=noopener noreferrer');
    }
  }

  return (
    <div className={styles.itemContainer}>
      <div onClick={hrefHandler} className={styles.itemName}><b>{`${item.name}`}</b></div>
      <div className={styles.trashContainer} onClick={() => setActive(true)}>
        <Trash />
      </div>
      <Modal active={active} setActive={setActive}>
        <h3>Точно удалить пункт коллекции?</h3>
        <div className={styles.choiceButtons}>
          <div onClick={deleteHandler}>Да</div>
          <div onClick={() => setActive(false)}>Нет</div>
        </div>
      </Modal>
    </div>
  )
}

export default Item