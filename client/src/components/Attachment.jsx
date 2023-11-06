import React, { useState } from 'react';
import Modal from '../common/Modal';
import styles from '../css/Attachment.module.css';

const Attachment = ({ attachment }) => {

    const [active, setActive] = useState(false);

    return (
        <div>
            <img onClick={() => setActive(true)} className={styles.thumbnail} src={attachment.path} alt={attachment.id} />
            <Modal active={active} setActive={setActive}>
                <div className={styles.imgContainer}>
                    <img width={'100%'} src={attachment.path} alt={attachment.id} />
                </div>
            </Modal>
        </div>
    )
}

export default Attachment