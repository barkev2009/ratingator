import React, { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import styles from '../css/Attachment.module.css';
import Carousel from './Carousel';
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
        dispatch(editItem({id: item.id, avatar_path: path}));
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
                attachments.filter(att => att.itemId === item.id).length > 0 ?
                    <img onClick={() => setActive(true)} className={styles.thumbnail} src={item.avatar_path} alt={`${item.name} avatar`} /> :
                    <div onClick={() => setActive(true)} className={styles.thumbnail}>No image</div>
            }
            {loading && <div className={styles.loader}><div className={styles.spinner}></div></div>}
            <span className={styles.pic_count}>{attachments.length}</span>
            <Modal active={active} setActive={setActive}>
                <form onSubmit={submitHandler}>
                    {
                        attachments.filter(att => att.itemId === item.id).length > 0 ? <img className={[styles.thumbnail, styles.bigger].join(' ')} src={item.avatar_path} alt={`${item.name} avatar`} /> : <div className={[styles.thumbnail, styles.bigger].join(' ')}><div>No image</div></div>
                    }
                    <h3 style={{ color: 'black' }}>Добавить аватар:</h3>
                    <input placeholder='URL до файла' onChange={e => setPath(e.target.value)} value={path} />
                    <button type='submit' disabled={path.trim() === ''}>CREATE</button>
                </form>
            </Modal>
        </div>
    )
}

export default Attachment