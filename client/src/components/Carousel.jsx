import React, { useEffect, useRef, useState } from 'react';
import styles from '../css/Carousel.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAttachment, getAttachmentsSelector } from '../reducers/attachments';
import TrashIcon from '../svg/Trash';
import ArrowLeft from '../svg/ArrowLeft';
import ArrowRight from '../svg/ArrowRight';
import Modal from '../common/Modal';

const Carousel = ({ itemId }) => {
    const carouselItems = useSelector(state => getAttachmentsSelector(state, itemId));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [active, setActive] = useState(false);
    const [attachmentId, setAttachmentId] = useState(null);
    const carouselRef = useRef(null);
    const innerRef = useRef(null);

    const dispatch = useDispatch();

    // Инициализация карусели
    useEffect(() => {
        if (innerRef.current && carouselItems.length > 0) {
            goToSlide(0);
        }
    }, []);

    // Обработчик свайпа
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const diff = touchStart - touchEnd;
        if (diff > 5) {
            goToNextSlide(); // Свайп влево
        } else if (diff < -5) {
            goToPrevSlide(); // Свайп вправо
        }

        setTouchStart(null);
        setTouchEnd(null);
    };

    // Навигация по слайдам
    const goToSlide = (index) => {
        if (carouselItems.length === 0) return;

        let newIndex = index;
        if (index < 0) {
            newIndex = carouselItems.length - 1;
        } else if (index >= carouselItems.length) {
            newIndex = 0;
        }

        setCurrentIndex(newIndex);
        const width = carouselRef.current.clientWidth;
        innerRef.current.style.transform = `translateX(-${newIndex * width}px)`;
    };

    const goToNextSlide = () => goToSlide(currentIndex + 1);
    const goToPrevSlide = () => goToSlide(currentIndex - 1);

    // Удаление изображения
    const deleteHandler = () => {
        if (attachmentId) {
            dispatch(deleteAttachment({ id: attachmentId }));
        }
        setActive(false);
        // После удаления переходим на предыдущий слайд
        if (currentIndex >= carouselItems.length - 1) {
            goToPrevSlide();
        }
    };

    return (
        <div className={styles.carouselContainer}>
            <div
                ref={carouselRef}
                className={styles.carousel}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div ref={innerRef} className={styles.carouselInner}>
                    {carouselItems.map((item, idx) => (
                        <div key={idx} className={styles.carouselItem}>
                            <img
                                src={item.path}
                                alt={`Изображение ${idx + 1}`}
                                className={styles.carouselImage}
                            />
                            <button
                                className={styles.deleteButton}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setAttachmentId(item.id);
                                    setActive(true);
                                }}
                                aria-label="Удалить изображение"
                            >
                                <TrashIcon className={styles.trashIcon} />
                            </button>
                        </div>
                    ))}
                </div>

                {carouselItems.length > 1 && (
                    <>
                        <button
                            className={`${styles.carouselBtn} ${styles.leftBtn}`}
                            onClick={goToPrevSlide}
                            aria-label="Предыдущее изображение"
                        >
                            <ArrowLeft className={styles.arrowIcon} />
                        </button>
                        <button
                            className={`${styles.carouselBtn} ${styles.rightBtn}`}
                            onClick={goToNextSlide}
                            aria-label="Следующее изображение"
                        >
                            <ArrowRight className={styles.arrowIcon} />
                        </button>
                    </>
                )}
            </div>

            {carouselItems.length > 1 && (
                <div className={styles.markersContainer}>
                    {carouselItems.map((_, idx) => (
                        <button
                            key={idx}
                            className={`${styles.marker} ${currentIndex === idx ? styles.activeMarker : ''}`}
                            onClick={() => goToSlide(idx)}
                            aria-label={`Перейти к изображению ${idx + 1}`}
                        />
                    ))}
                </div>
            )}

            <Modal active={active} setActive={setActive}>
                <div className={styles.modalContent}>
                    <h3 className={styles.modalTitle}>Удалить изображение?</h3>
                    <p className={styles.modalText}>Это действие нельзя отменить</p>
                    <div className={styles.modalButtons}>
                        <button
                            className={styles.confirmButton}
                            onClick={deleteHandler}
                        >
                            Удалить
                        </button>
                        <button
                            className={styles.cancelButton}
                            onClick={() => setActive(false)}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Carousel;