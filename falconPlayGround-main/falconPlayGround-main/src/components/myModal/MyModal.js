import React from 'react';
import styles from './myModal.module.css';
import Modal from './Modal.js';

const MyModal = () => {
  const [modalFlag, setModalFlag] = React.useState(false);
  const [showSaveModal, setSaveModal] = React.useState(false);
  const onClickHandler = e => {
    e.preventDefault();
    setModalFlag(true);
  };

  const onShowHandler = () => {
    setSaveModal(true);
    setTimeout(() => {
      setSaveModal(false);
    }, 2000);
  };

  const onChangeHandler = () => {
    setModalFlag(pre => {
      return !pre;
    });
  };
  return (
    <div className={styles.parent}>
      {showSaveModal ? (
        <div className={styles.saveModal}>
          <p className={styles.message}>Signature saved successfully</p>
        </div>
      ) : (
        ''
      )}
      {modalFlag ? (
        <Modal change={onChangeHandler} show={onShowHandler} />
      ) : (
        <button className={`${modalFlag ? styles.hide : styles.btn}`} onClick={onClickHandler}>
          Signature
        </button>
      )}
    </div>
  );
};

export default MyModal;
