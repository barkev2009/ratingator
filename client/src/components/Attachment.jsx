import React, { useState } from 'react';
import Modal from '../common/Modal';
import styles from '../css/Attachment.module.css';
import Carousel from './Carousel';
import { useSelector } from 'react-redux';
import { getAttachmentsSelector } from '../reducers/attachments';

const Attachment = ({ attachment }) => {

    const [active, setActive] = useState(false);
    const attachments = useSelector(state => getAttachmentsSelector(state, attachment.itemId))

    return (
        <div style={{display: 'flex', position: 'relative'}}>
            <img onClick={() => setActive(true)} className={styles.thumbnail} src={attachment.path} alt={attachment.id} />
            <span className={styles.pic_count}>{attachments.length}</span>
            <Modal active={active} setActive={setActive}>
                <Carousel itemId={attachment.itemId} />
            </Modal>
        </div>
    )
}

export default Attachment