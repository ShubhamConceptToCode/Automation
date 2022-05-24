import React from 'react';
import styles from './login.module.css';
import validator from 'validator';
import axios from 'axios';
import Loader from '../common/Loader';
import { toast } from 'react-toastify';
import { useHistory, Link } from 'react-router-dom';
import {  Card, CardBody ,Button, Form, Row, Col, FormGroup, Input, CustomInput, Label } from 'reactstrap';
import Section from '../common/Section';

const EditUser = (props) => {
  const history = useHistory();
  const [userName, setUserName] = React.useState(props.data.name);
  const [userEmail, setUserEmail] = React.useState(props.data.email);
  const [userPassword, setUserPassword] = React.useState('test1234');
  const [userConfirmPassword, setUserConfirmPassword] = React.useState('test1234');
  const [line, setLine] = React.useState(props.data.line);
  const [city, setCity] = React.useState(props.data.city);
  const [state, setState] = React.useState(props.data.state);
  const [country, setCountry] = React.useState(props.data.country);
  const [code, setCode] = React.useState(props.data.postal_code);
  const onClickSave = async e => {
    try{
    e.preventDefault();
    console.log("inside editUser");
    let payload = { name: userName, email: userEmail,line:line, city: city,state: state, 
      country: country,
      postal_code : code,
      token: localStorage.getItem('token') };
    if (userName.length < 3) {
      toast.error('User name is not valid');
    } else if (userPassword.length < 8) {
      toast.error('Password is not Valid');
    } else if (userConfirmPassword !== userPassword) {
      toast.error('Password and Confirm Password not same');
    } else if (validator.isEmail(userEmail)) {
      if (userPassword !== 'test1234') {
        payload = {
          name: userName,
          email: userEmail,
          token: localStorage.getItem('token'),
          password: userPassword,
          passwordConfirm: userConfirmPassword
        };
      }
      console.log(payload);            
      const res = await axios.post(`${process.env.REACT_APP_PORT}/User/api/update`, payload);
      console.log("this is res.body",res);
      history.push('/dashboard/card-details');
    } else {
      toast.error('Email is not valid');
    }
    }catch(err){
      console.log(err);
    }
  };

  const onNameChange = e => {
    setUserName(e.target.value);
  };
  const onEmailChange = e => {
    setUserEmail(e.target.value);
  };
  const onPasswordChange = e => {
    setUserPassword(e.target.value);
  };
  const onConfirmPasswordChange = e => {
    setUserConfirmPassword(e.target.value);
  };
  return (
    <>
    <form>
      <Section className="py-0">
    <Row className="flex-center min-vh-100 py-6">
      <Col sm={15} md={10} lg={15} xl={7} className="col-xxl-4">
        <Card>
          <CardBody className="fs--1 font-weight-normal p-5">
          <Row className="text-left justify-content-between">
      <Col xs="auto">
        <h2>Edit User Details</h2>
      </Col>
    </Row>
    <FormGroup>
     <input value={userName} onChange={onNameChange} />
      </FormGroup>
      <FormGroup>
      <input value={userEmail} onChange={onEmailChange} />
      </FormGroup>
      <FormGroup>
      <input value={userPassword} onChange={onPasswordChange} type="password" />
      </FormGroup>
      <FormGroup>
      <input value={userConfirmPassword} onChange={onConfirmPasswordChange} type="password" />
      </FormGroup>
      <FormGroup>
      <input value={line} onChange={(e) =>setLine(e.target.value) } placeholder={props.data.line} required/>
      </FormGroup>
      <FormGroup>
      <input value={city} onChange={(e) =>setCity(e.target.value) } placeholder={props.data.city} required/>
      </FormGroup>
      <FormGroup>
      <input value={state} onChange={(e) =>setState(e.target.value) } placeholder={props.data.state} required/>
      </FormGroup>
       <FormGroup>
      <input value={code} onChange={(e) =>setCode(e.target.value)} placeholder={props.data.postal_code} required/>
      </FormGroup> 
      <FormGroup>
      <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder={props.data.country} required/>
      </FormGroup>
      <button className="btn">
        <Link to="/dashboard/card-details">
        Back
        </Link>
      </button>
      <button className="btn" onClick={onClickSave}>
        Save Changes
      </button>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Section>
        
    </form>
    </>
  );
};
let obj = {};
const Edit = () => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    (async function(){
      try{
      const payload = {
        customer_id : localStorage.getItem('customer_id')
      }
      const user = await axios.post(`${process.env.REACT_APP_PORT}/getData/user`, payload);
      obj = user.data.body;
      if(obj){
        setLoading(false);
      }
    }catch(err){
      console.log(err.message);
    }
    })()
  },[])
  return <>
    {loading ? <Loader/> : <EditUser data={obj} />}
  </>
}

export default Edit;
