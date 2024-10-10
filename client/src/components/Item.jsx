import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItem, editItem } from '../reducers/items';
import styles from '../css/Item.module.css';
import Modal from '../common/Modal';
import Trash from '../svg/Trash';
import Attachment from './Attachment';
import AddAttachment from './AddAttachment';
import Rating from './Rating';
import ItemTags from '../containers/ItemTags';
import ControlTags from '../containers/ControlTags';

const Item = ({ item }) => {

  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [name, setName] = useState(item.name);
  const [activeTag, setActiveTag] = useState(false);
  const attachments = useSelector(state => state.attachments.data);

  const deleteHandler = () => {
    dispatch(deleteItem({ id: item.id }))
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (name.trim() === null || name.trim() === undefined || name.trim() === '') {
      setName(item.name);
    } else {
      dispatch(editItem({ id: item.id, name: name.trim() }));
    }
  }

  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemInfoContainer}>
        <div onClick={() => setActiveTag(true)} className={styles.itemName}><b>{`${item.name}`}</b></div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div className={styles.attachmentsContainer}>
            <AddAttachment itemId={item.id} />
            {
              attachments.filter(att => att.itemId === item.id).length > 0 && <Attachment attachment={attachments.filter(att => att.itemId === item.id)[0]} />
            }
          </div>
          <div className={styles.trashContainer} onClick={() => setActive(true)}>
            <Trash />
          </div>
          <Rating item={item} />
        </div>
        <Modal active={active} setActive={setActive}>
          <h3>Точно удалить пункт коллекции?</h3>
          <div className={styles.choiceButtons}>
            <div onClick={deleteHandler}>Да</div>
            <div onClick={() => setActive(false)}>Нет</div>
          </div>
        </Modal>
        <Modal active={activeTag} setActive={setActiveTag}>
          <form onSubmit={submitHandler}>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <button type="submit" disabled={item.name.trim() === name.trim()}>SAVE</button>
          </form>
          <h3>{`Управление тэгами: ${item.name}`}</h3>
          <ControlTags item={item} />
        </Modal>
      </div>
      {item.tags.length > 0 && <ItemTags item={item} />}
    </div>

  )
}

export default Item