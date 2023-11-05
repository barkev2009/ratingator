import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../slices/items';
import styles from '../css/Item.module.css';
import Modal from '../common/Modal';
import Trash from '../svg/Trash';

const Item = ({ item }) => {

  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const deleteHandler = () => {
    dispatch(deleteItem({ id: item.id }))
  }

  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemName}><b>{`${item.name}`}</b></div>
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

export default Item