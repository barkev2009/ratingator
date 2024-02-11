import React, { useState } from 'react';
import Modal from '../common/Modal';
import styles from '../css/Items.module.css';

const CreateTagButton = () => {

    const [active, setActive] = useState(false);

  return (
    <div>
        <div className={styles.createTag} onClick={() => setActive(!active)}>Create tag</div>
        <Modal active={active} setActive={setActive} >

        </Modal>
    </div>
  )
}

export default CreateTagButton