import React, { useEffect, useRef, useState } from 'react';
import styles from '../css/Carousel.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAttachment, getAttachmentsSelector } from '../reducers/attachments';
import Trash from '../svg/Trash';
import Modal from '../common/Modal';

const Carousel = ({ itemId }) => {

    const carouselItems = useSelector(state => getAttachmentsSelector(state, itemId));
    const currentIndex = useRef(0);
    const [marker, setMarker] = useState(0);
    const [active, setActive] = useState(false);
    const [attachmentId, setAttachmentId] = useState(null);

    useEffect(
        () => {
            document.getElementById(itemId).querySelector('.' + styles['carousel-inner']).style.width = `${carouselItems.length * 100}%`;
        }, [carouselItems]
    );

    function goToSlide(index) {
        const carouselItems = document.getElementById(itemId).querySelectorAll('.' + styles['carousel-item']);
        if (index < 0) {
            index = carouselItems.length - 1;
        } else if (index >= carouselItems.length) {
            index = 0;
        }
        currentIndex.current = index;
        const width = document.getElementById(itemId).querySelector('.' + styles['carousel-item']).clientWidth;
        document.getElementById(itemId).querySelector('.' + styles['carousel-inner']).style.transform = `translateX(-${currentIndex.current * width}px)`;
        setMarker(currentIndex.current);
    }

    function goToNextSlide() {
        goToSlide(currentIndex.current + 1);
    }

    function goToPrevSlide() {
        goToSlide(currentIndex.current - 1);
    }

    function markerHandler(index) {
        return function () {
            currentIndex.current = index;
            goToSlide(index);
        }
    }

    const dispatch = useDispatch();
    const deleteHandler = () => {
        if (attachmentId) {
            dispatch(deleteAttachment({id: attachmentId}));
        }
        setAttachmentId(null);
        setActive(false);
    }

    // window.addEventListener('resize', function () {
    //     goToPrevSlide();
    //     goToNextSlide();
    // }, true);

    return (
        <div id={itemId} className={styles.carousel_container}>
            <div className={styles.carousel}>
                <div className={styles['carousel-inner']}>
                    {
                        carouselItems.map(
                            (item, idx) => <div id={`c${idx + 1}`} key={idx} className={styles['carousel-item']}>
                                <img src={item.path} alt="" />
                                <Trash onClick={() => {setAttachmentId(item.id); setActive(true)}} />
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={styles['carousel-marker_container']}>
                {
                    carouselItems.map((item, idx) => <div className={`${styles['carousel-marker']} ${marker === idx ? styles.active : ''}`} onClick={markerHandler(idx)} key={idx}></div>)
                }
            </div>
            <button className={[styles.carousel_btn, styles.left].join(' ')} onClick={goToPrevSlide}>{'<'}</button>
            <button className={[styles.carousel_btn, styles.right].join(' ')} onClick={goToNextSlide}>{'>'}</button>
            <Modal active={active} setActive={setActive}>
                <h3 style={{ color: 'black' }}>Точно удалить изображение?</h3>
                <div>
                    <button onClick={deleteHandler}>Да</button>
                    <button onClick={() => setActive(false)}>Нет</button>
                </div>
            </Modal>
        </div>
    )
}

export default Carousel