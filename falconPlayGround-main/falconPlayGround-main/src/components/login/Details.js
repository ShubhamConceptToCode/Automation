import React from 'react';
import Edit from './Edit.js';
import styles from './login.module.css';
import Stripe from '../stripe/Stripe';

const Details = props => {
  const [showEdit, setShowEdit] = React.useState(false);
  const onClickBack = e => {
    e.preventDefault();
    props.back();
  };
  const onClickEdit = e => {
    e.preventDefault();
    setShowEdit(true);
  };
  const onBack = e => {
    setShowEdit(false);
  };
  return (
    <>
      {showEdit ? (
        <Edit data={props} back={onBack} />
      ) : (
        <div className={styles.details}>
          <h1>User Details</h1>
          <label>name</label>
          <h3>{props.data.name}</h3>
          <label>email</label>
          <h3>{props.data.email}</h3>
          <button className="btn" onClick={onClickBack}>
            Back
          </button>
          <button className="btn" onClick={onClickEdit}>
            Edit Profile
          </button>
          <Stripe />
        </div>
      )}
    </>
  );
};

export default Details;
