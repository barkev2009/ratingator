import React, { useState } from 'react';
import Modal from '../common/Modal';
import styles from '../css/Attachment.module.css';
import Trash from '../svg/Trash';
import { useDispatch } from 'react-redux';
import { deleteAttachment } from '../reducers/attachments';

const Attachment = ({ attachment }) => {

    const [active, setActive] = useState(false);
    const dispatch = useDispatch();

    const deleteHandler = () => {
        dispatch(deleteAttachment({ id: attachment.id }));
        setActive(false);
    }

    return (
        <div style={{display: 'flex'}}>
            <img onClick={() => setActive(true)} className={styles.thumbnail} src={attachment.path} alt={attachment.id} />
            <Modal active={active} setActive={setActive}>
                <div className={styles.imgContainer} >
                    <img width={'100%'} src={attachment.path} alt={attachment.id} />
                    <div onClick={deleteHandler}>
                        <Trash />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Attachment