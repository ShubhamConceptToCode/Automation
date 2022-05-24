import React from 'react';
import axios from 'axios';

const Stripe = () => {
  const onClickHandler = async e => {
    e.preventDefault();
    const payload = {
      token: localStorage.getItem('token')
    };
    const res = await axios.post('http://localhost:3000/subscriber/cancel', payload);
  };
  return (
    <>
      <button type="submit">
        <a href="/payment">Payment</a>
      </button>
      <button onClick={onClickHandler}>
        <a>Cancel Subscription</a>
      </button>
    </>
  );
};

export default Stripe;
