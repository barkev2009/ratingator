import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { setCookie } from "../utils/cookies";
import styles from '../css/Items.module.css';
import itemStyles from '../css/Item.module.css';

// Хук для установления текущей страницы, удобен при рефреше
export const useSetCookie = () => {
    const location = useLocation();
    useEffect(
        () => {
            setCookie('curPage', location.pathname);
        }, []
    );
}

export const useItemsIntersectionObserver = (setScrollRef, current, total) => {
    const time = useRef(0);
    const exists = useRef(false);
    const mutationObserver = new MutationObserver(
        (mutationsList, observer) => {
            mutationsList.forEach(
                mutation => {
                    if (mutation.target.classList.contains(styles.itemsContainer)) {
                        exists.current = document.querySelectorAll('.' + itemStyles.itemContainer).length !== 0;
                    }
                }
            );
        }
    );

    mutationObserver.observe(
        document.getElementById("root"),
        {
            attributes: true,
            childList: true,
            subtree: true,
        }
    );

    current >= 0 && current < total && setTimeout(
        () => {
            let options = {
                root: null,
                rootMargin: "0px",
                threshold: 1,
            };
            const callback = (entries, observer) => {
                let entry;
                for (let i = 0; i < entries.length; i++) {
                    entry = entries[i];
                    if (entry.intersectionRatio === 1 && time.current === 0) {
                        setScrollRef(prev => prev + 1);
                        observer.disconnect();
                        time.current = entry.time;
                        break;
                    }
                }
                if (exists.current) {
                    observer.observe(document.querySelector('.' + itemStyles.itemContainer + ':last-child'));
                }

            };
            time.current = 0;

            let observer = new IntersectionObserver(callback, options);
            if (exists.current) {
                observer.observe(document.querySelector('.' + itemStyles.itemContainer + ':last-child'));
            } else {
                observer.disconnect();
            }
        }, 100
    );










    // setTimeout(
    //     () => {
    //         let options = {
    //             root: null,
    //             rootMargin: "0px",
    //             threshold: 1,
    //         };

    //         const callback = (entries, observer) => {
    //             entries.forEach(entry => {
    //                 if (entry.intersectionRatio === 1 && time.current === 0) {
    //                     setScrollRef(prev => prev + 1);
    //                     observer.disconnect();
    //                     time.current = entry.time;
    //                 }
    //             })
    //             observer.observe(document.querySelector('.' + itemStyles.itemContainer + ':last-child'));
    //         }
    //         time.current = 0;

    //         let observer = new IntersectionObserver(callback, options);
    //         observer.observe(document.querySelector('.' + itemStyles.itemContainer + ':last-child'));
    //     }, 1000
    // );
}