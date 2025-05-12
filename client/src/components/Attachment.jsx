import React, { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import styles from '../css/Attachment.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAttachmentsSelector } from '../reducers/attachments';
import { editItem } from '../reducers/items';

const Attachment = ({ item }) => {

    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const error = useSelector(state => state.items.error);
    const [path, setPath] = useState('');
    const dispatch = useDispatch();
    const attachments = useSelector(state => getAttachmentsSelector(state, item.id));

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editItem({ id: item.id, avatar_path: path }));
        setActive(false);
        setLoading(true);
        setPath('');
    }
    useEffect(
        () => {
            if (!active) {
                setPath('');
            }
        }, [active]
    );
    useEffect(
        () => {
            setLoading(false);
        }, [item.avatar_path, error]
    );

    return (
        <div style={{ display: 'flex', position: 'relative' }}>
            {
                !!item.avatar_path ?
                    <img onClick={() => setActive(true)} className={styles.thumbnail} src={item.avatar_path} alt={`${item.name} avatar`} /> :
                    <div onClick={() => setActive(true)} className={styles.thumbnail}>No image</div>
            }
            {loading && <div className={styles.loader}><div className={styles.spinner}></div></div>}
            <span className={styles.pic_count}>{attachments.length}</span>
            <Modal active={active} setActive={setActive}>
                <form onSubmit={submitHandler} className={styles.avatarForm}>
                    <div className={styles.avatarPreview}>
                        {item.avatar_path ? (
                            <img
                                src={item.avatar_path}
                                alt={`${item.name} avatar`}
                                className={styles.avatarImage}
                            />
                        ) : (
                            <div className={styles.avatarPlaceholder}>
                                <span>No image</span>
                            </div>
                        )}
                    </div>

                    <h3 className={styles.formTitle}>Добавить аватар</h3>

                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Введите URL изображения"
                            className={styles.urlInput}
                            onChange={e => setPath(e.target.value)}
                            value={path}
                        />
                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={path.trim() === ''}
                        >
                            Сохранить
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default Attachment