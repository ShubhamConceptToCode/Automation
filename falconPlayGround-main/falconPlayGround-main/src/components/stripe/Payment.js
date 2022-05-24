import React from 'react';
import Styles from '../login/login.module.css';
import axios from 'axios';

const Payment = () => {
  const [name, setName] = React.useState('');
  const [cardNumber, setCardNumber] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [year, setYear] = React.useState('');
  const [cvc, setCvc] = React.useState('');
  const onNameChange = e => {
    setName(e.target.value);
  };
  const onMonthChange = e => {
    setMonth(e.target.value);
  };
  const onYearChange = e => {
    setYear(e.target.value);
  };
  const onCardNumberChange = e => {
    setCardNumber(e.target.value);
  };
  const onCvcChange = e => {
    setCvc(e.target.value);
  };
  const onClickHandler = async e => {
    // e.preventDefault();
    // number: req.body.number,
    // exp_month: req.body.exp_month,
    // exp_year: req.body.exp_year,
    // cvc: req.body.cvc,
    // name: req.body.name
    const payload = {
      number: cardNumber,
      exp_month: month,
      exp_year: year,
      cvc: cvc,
      name: name,
      token: localStorage.getItem('token')
    };
    try {
      const res = await axios.post('http://localhost:3000/subscriber/pay', payload);
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <form className={Styles.form}>
      <label>Card Holder Name</label>
      <input type="text" onChange={onNameChange} />
      <label>Card Number</label>
      <input type="number" onChange={onCardNumberChange} />
      <label style={{ display: 'block' }}>Expr</label>
      <input type="number" style={{ display: 'inline', width: '50px' }} onChange={onMonthChange} />
      <input type="number" style={{ display: 'inline', width: '50px' }} onChange={onYearChange} />
      <label style={{ display: 'block' }}>CVC</label>
      <input onChange={onCvcChange} />
      <button style={{ margin: '5px' }} onClick={onClickHandler}>
        <a href="http://localhost:3001"> PAYMENT </a>
      </button>
    </form>
  );
};

export default Payment;
