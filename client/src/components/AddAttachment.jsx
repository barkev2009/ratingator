import React, { useState } from 'react';
import styles from '../css/Item.module.css';
import Modal from '../common/Modal';
import { useDispatch } from 'react-redux';
import { createAttachment } from '../reducers/attachments';
import Plus from '../svg/Plus';

const AddAttachment = ({ itemId }) => {

    const [active, setActive] = useState(false);
    const [path, setPath] = useState('');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        if (path !== '') {
            dispatch(createAttachment({ path, itemId }));
            setActive(false);
            setPath('');
        }
    }

    return (
        <>
            <div onClick={() => setActive(true)} className={styles.addAttachment}>
                <Plus />
            </div>
            <Modal active={active} setActive={setActive}>
                <form onSubmit={submitHandler}>
                    <h3 style={{color: 'black'}}>Создать приложение</h3>
                    <input placeholder='URL до файла' onChange={e => setPath(e.target.value)} value={path} />
                    <button type='submit' disabled={path.trim() === ''}>CREATE</button>
                </form>
            </Modal>
        </>
    )
}

export default AddAttachment