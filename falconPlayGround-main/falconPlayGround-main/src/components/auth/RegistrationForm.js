import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button, CustomInput, Form, FormGroup, Input, Label } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';

const RegistrationForm = ({ setRedirect, setRedirectUrl, layout, hasLabel }) => {
  // State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [line, setLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pin, setPin] = useState('');
  const [country, setCountry] = useState('');
  const [errMsg, setErrMsg] = useState('');
  // Handler
  const handleSubmit =async e => {
    e.preventDefault();
    try{
    if(name.length < 3){
      throw new Error("name should be at least 3 characters");
    }
    else if(!validator.isEmail(email)){
      throw new Error("email in not valid");
    }
    else if(password.length < 8){
      throw new Error("password must be at least 8 characters");
    }
    else if(password !== confirmPassword){
      throw new Error("password and confirm password do not match");
    }
    const post = { name: name, email: email,
      password: password, passwordConfirm: confirmPassword, 
      line : line, city : city, state : state, country : country,
      postal_code:pin
    };
    const res = await axios.post(`${process.env.REACT_APP_PORT}/User/api/signup`, post);
    localStorage.setItem('token', res.data.data.token);
    localStorage.setItem('customer_id', res.data.data.customerId);
    toast.success(`Successfully registered as ${name}`);
    window.open('/dashboard', "_self")
  }catch(err){
    toast.error(err.message);
    console.log(err.message);
  }
  };

  useEffect(() => {
    setIsDisabled(!name || !email || !password || !confirmPassword || !line || !city || !state || !country || !pin);
  }, [name, email, password, confirmPassword, line, city, state, country, pin]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        {hasLabel && <Label>Name</Label>}
        <Input placeholder={!hasLabel ? 'Name' : ''}
         value={name} 
         onChange={({ target }) => setName(target.value)} 
         required/>
      </FormGroup>
      <FormGroup>
        {hasLabel && <Label>Email address</Label>}
        <Input
          placeholder={!hasLabel ? 'Email address' : ''}
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type="email"
          required
        />
      </FormGroup>
      <div className="form-row">
        <FormGroup className="col-6">
          {hasLabel && <Label>Password</Label>}
          <Input
            placeholder={!hasLabel ? 'Password' : ''}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
            required
          />
        </FormGroup>
        <FormGroup className="col-6">
          {hasLabel && <Label>Confirm Password</Label>}
          <Input
            placeholder={!hasLabel ? 'Confirm Password' : ''}
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            type="password"
            required
          />
        </FormGroup>
        </div>
        <FormGroup>
        <h5>Address</h5>
        <Input
          value={line}
          onChange = {({ target }) => setLine(target.value) }
          placeholder='Line'
          required
        />
      </FormGroup>
      <FormGroup>
        <Input
          value={city}
          onChange={({ target }) => setCity(target.value)}
          placeholder='City'
          required
        />
      </FormGroup>
      <FormGroup>
        <Input
          value={state}
          onChange={({ target }) => setState(target.value)}
          placeholder='State'
          required
        />
      </FormGroup>
      <FormGroup>
        <Input
          value={pin}
          onChange={({ target }) => setPin(target.value)}
          placeholder='Pin Code'
          required
        />
      </FormGroup>
      <FormGroup>
        <Input
          value={country}
          onChange={({ target }) => setCountry(target.value)}
          placeholder='Country'
          required
        />
      </FormGroup>
      <FormGroup>
        <Button color="primary" block className="mt-3" disabled={isDisabled}>
          Register
        </Button>
      </FormGroup>
    </Form>
  );
};

RegistrationForm.propTypes = {
  setRedirect: PropTypes.func.isRequired,
  setRedirectUrl: PropTypes.func.isRequired,
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};


export default RegistrationForm;
