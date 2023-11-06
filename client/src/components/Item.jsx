import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem } from '../reducers/items';
import styles from '../css/Item.module.css';
import Modal from '../common/Modal';
import Trash from '../svg/Trash';
import Attachment from './Attachment';
import AddAttachment from './AddAttachment';

const Item = ({ item, openVK }) => {

  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [activeCreate, setActiveCreate] = useState(false);
  const attachments = useSelector(state => state.attachments.data);

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
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div className={styles.attachmentsContainer}>
          <AddAttachment itemId={item.id} />
          {
            attachments.filter(att => att.itemId === item.id).map(
              item => <Attachment key={item.id} attachment={item} />
            )
          }
        </div>
        <div className={styles.trashContainer} onClick={() => setActive(true)}>
          <Trash />
        </div>
      </div>
      <Modal active={activeCreate} setActive={setActiveCreate}>
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