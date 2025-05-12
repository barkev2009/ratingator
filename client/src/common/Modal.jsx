import React, { useEffect } from 'react';
import styles from '../css/Modal.module.css';

const Modal = ({ active, setActive, children }) => {
  // Блокируем скролл при открытом модальном окне
  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={() => setActive(false)}
    >
      <div
        className={styles.modalContent}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;