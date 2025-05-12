import React, { useState } from 'react';
import styles from '../css/AddAttachment.module.css';
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
                <form onSubmit={submitHandler} className={styles.form}>
                    <h3 className={styles.formTitle}>Создать приложение</h3>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Введите URL до файла"
                            className={styles.input}
                            onChange={e => setPath(e.target.value)}
                            value={path}
                        />
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={path.trim() === ''}
                        >
                            Создать
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default AddAttachment