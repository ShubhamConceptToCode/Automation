import React from 'react';
import styles from './myModal.module.css';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';

const Modal = props => {
  const [obj, setObj] = React.useState({});
  const [errorModal, setErrorModal] = React.useState(false);
  const onSave = e => {
    e.preventDefault();
    if (!obj.isEmpty()) {
      axios.post('http://localhost:3000/api/saveSignature', { signatureImg: obj.toDataURL() });
      props.show();
      props.change();
    } else {
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000);
    }
  };
  const onClear = e => {
    e.preventDefault();
    if (Object.keys(obj).length !== 0) {
      obj.clear();
    }
  };
  const refFunction = ref => {
    setObj(ref);
  };
  const onBack = e => {
    e.preventDefault();
    props.change(false);
  };
  return (
    <>
      {errorModal ? (
        <div className={styles.errorModal}>
          <p className={styles.message}>Signature needed</p>
        </div>
      ) : (
        ''
      )}
      <div className={`${errorModal ? styles.modal_error : styles.modal}`}>
        <SignatureCanvas
          ref={refFunction}
          penColor="green"
          canvasProps={{ width: 550, height: 300, className: 'sigCanvas' }}
        />
        <button onClick={onClear} className={styles.modal_btn}>
          clear
        </button>
        <button onClick={onBack} className={styles.modal_btn}>
          back
        </button>
        <button onClick={onSave} className={styles.modal_btn}>
          save signature
        </button>
      </div>
    </>
  );
};

export default Modal;
