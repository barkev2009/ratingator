import React, { useEffect, useRef, useState } from 'react';
import styles from '../css/Carousel.module.css';
import { useSelector } from 'react-redux';
import { getAttachmentsSelector } from '../reducers/attachments';

const Carousel = ({ itemId }) => {

    const CAROUSEL_ITEMS = useSelector(state => getAttachmentsSelector(state, itemId));
    const currentIndex = useRef(0);
    const [marker, setMarker] = useState(0);

    useEffect(
        () => {
            document.getElementById(itemId).querySelector('.' + styles['carousel-inner']).style.width = `${CAROUSEL_ITEMS.length * 100}%`;
        }, [CAROUSEL_ITEMS]
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

    // window.addEventListener('resize', function () {
    //     goToPrevSlide();
    //     goToNextSlide();
    // }, true);

    return (
        <div id={itemId} className={styles.carousel_container}>
            <div className={styles.carousel}>
                <div className={styles['carousel-inner']}>
                    {
                        CAROUSEL_ITEMS.map(
                            (item, idx) => <div id={`c${idx + 1}`} key={idx} className={styles['carousel-item']}>
                                {/* <div style={{backgroundImage: `url(${item.path})`}} /> */}
                                <img src={item.path} alt="" />
                            </div>
                        )
                    }
                </div>
            </div>
            <div className={styles['carousel-marker_container']}>
                {
                    CAROUSEL_ITEMS.map((item, idx) => <div className={`${styles['carousel-marker']} ${marker === idx ? styles.active : ''}`} onClick={markerHandler(idx)} key={idx}></div>)
                }
            </div>
            <button className={[styles.carousel_btn, styles.left].join(' ')} onClick={goToPrevSlide}>{'<'}</button>
            <button className={[styles.carousel_btn, styles.right].join(' ')} onClick={goToNextSlide}>{'>'}</button>
        </div>

    )
}

export default Carousel