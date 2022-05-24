import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col, FormGroup, Input, CustomInput, Label } from 'reactstrap';
import axios from 'axios';

const LoginForm = () => {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [showError, setShowError] = useState(false);
  // Handler
  const handleSubmit = async e => {
    e.preventDefault();
    try{
    const post = { email: email, password: password };
    const url = `${process.env.REACT_APP_PORT}/User/api/login`;
    console.log(url+ " this is url", process.env.REACT_APP_PORT);
    const res = await axios.post(url, post);
    localStorage.setItem('token', res.data.data.token);
    if(res.data.data.customerId){
    localStorage.setItem('customer_id', res.data.data.customerId);
    }
    if(res.data.data.cardId){
    localStorage.setItem('card_id', res.data.data.cardId);}
    window.open('/dashboard', "_self")
    toast.success(`Logged in as ${email}`);
    }catch(err){
      console.log(err.message);
      setShowError(true);
    }
  };
  if(showError){
    toast.error('Invalid Email and Password');
    setShowError(false);
  }
  useEffect(() => {
    setIsDisabled(!email || !password);
  }, [email, password]);

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="email"
        />
      </FormGroup>
      <FormGroup>
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type="password"
        />
      </FormGroup>

      <FormGroup>
        <Button color="primary" block className="mt-3" disabled={isDisabled}>
          Log in
        </Button>
      </FormGroup>
    </Form>
    </>
  );
};


export default LoginForm;
