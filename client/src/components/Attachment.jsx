import React, { useState } from 'react';
import Modal from '../common/Modal';
import styles from '../css/Attachment.module.css';
import Carousel from './Carousel';

const Attachment = ({ attachment }) => {

    const [active, setActive] = useState(false);

    return (
        <div style={{display: 'flex'}}>
            <img onClick={() => setActive(true)} className={styles.thumbnail} src={attachment.path} alt={attachment.id} />
            <Modal active={active} setActive={setActive}>
                <Carousel itemId={attachment.itemId} />
            </Modal>
        </div>
    )
}

export default Attachment