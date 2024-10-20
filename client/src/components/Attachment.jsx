import React, { useState } from 'react';
import Modal from '../common/Modal';
import styles from '../css/Attachment.module.css';
import Carousel from './Carousel';
import { useSelector } from 'react-redux';
import { getAttachmentsSelector } from '../reducers/attachments';

const Attachment = ({ item }) => {

    const [active, setActive] = useState(false);
    const attachments = useSelector(state => getAttachmentsSelector(state, item.id))

    return (
        <div style={{display: 'flex', position: 'relative'}}>
            <img onClick={() => setActive(true)} className={styles.thumbnail} src={item.avatar_path} alt={`${item.name} avatar`} />
            <span className={styles.pic_count}>{attachments.length}</span>
            <Modal active={active} setActive={setActive}>
                <Carousel itemId={item.id} />
            </Modal>
        </div>
    )
}

export default Attachment