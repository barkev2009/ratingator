import React, { useState } from 'react';
import Modal from '../common/Modal';
import styles from '../css/Items.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createTag } from '../reducers/tags';
import { useLocation } from 'react-router-dom';

const CreateTagButton = () => {

  const [active, setActive] = useState(false);
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const tags = useSelector(state => state.tags.data);
  const location = useLocation();
  const collectionId = location.pathname.split('/')[2];

  const clickHandler = () => {
    if (name !== '' && !tags.map(item => item.name).includes(name)) {
      dispatch(createTag({name, collectionId}))
      setActive(false);
      setName('');
    }
  }

  return (
    <div>
      <div className={styles.createTag} onClick={() => setActive(!active)}>Create tag</div>
      <Modal active={active} setActive={setActive} >
        <div>
          <h3 style={{color: 'black'}}>Создать тэг</h3>
          <input placeholder='Название тэга' onChange={e => setName(e.target.value.toLowerCase())} value={name} />
          <button onClick={clickHandler} type='submit'>CREATE</button>
        </div>
      </Modal>
    </div>
  )
}

export default CreateTagButton