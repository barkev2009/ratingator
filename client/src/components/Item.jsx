import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem } from '../reducers/items';
import styles from '../css/Item.module.css';
import attStyles from '../css/Attachment.module.css';
import Modal from '../common/Modal';
import Trash from '../svg/Trash';
import Attachment from './Attachment';
import Rating from './Rating';
import ItemTags from '../containers/ItemTags';
import { useNavigate } from 'react-router-dom';
import { CARD_ROUTE } from '../constants';

const Item = ({ item }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const attachments = useSelector(state => state.attachments.data);

  const clickHandler = () => {
    navigate(CARD_ROUTE.replace(':id', item.id));
  }

  const deleteHandler = () => {
    dispatch(deleteItem({ id: item.id }))
  }

  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemInfoContainer}>
        <div style={{ display: 'flex' }}>
          <div className={styles.attachmentsContainer}>
            <Attachment item={item} />
          </div>
          <div onClick={clickHandler} className={styles.itemName}><b>{`${item.name}`}</b></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div className={styles.trashContainer} onClick={() => setActive(true)}>
            <Trash />
          </div>
          <Rating item={item} />
        </div>
        <Modal active={active} setActive={setActive}>
          <h3 style={{ color: 'black' }}>Точно удалить пункт коллекции?</h3>
          <div className={styles.choiceButtons}>
            <button onClick={deleteHandler}>Да</button>
            <button onClick={() => setActive(false)}>Нет</button>
          </div>
        </Modal>
      </div>
      {item.tags.length > 0 && <ItemTags item={item} />}
    </div>

  )
}

export default Item