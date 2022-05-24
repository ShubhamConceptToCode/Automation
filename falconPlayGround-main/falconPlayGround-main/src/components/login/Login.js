import React from 'react';
import styles from './login.module.css';
import Signup from './Signup.js';
import validator from 'validator';
import axios from 'axios';
import Details from './Details';

const Login = () => {
  const [showDetails, setShowDetails] = React.useState(false);
  const [useDetails, setUserDetails] = React.useState({});
  const [signup, setSignup] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [showData, setShowData] = React.useState(false);
  const enteredEmail = React.useRef();
  const enteredPassword = React.useRef();
  const [fetchData, setFetchData] = React.useState('');
  const signupHandler = e => {
    e.preventDefault();
    setSignup(true);
  };
  const onLoginClick = () => {
    setSignup(false);
  };
  const clickOnLogin = async e => {
    e.preventDefault();
    try {
      if (email && password) {
        //TODO api call.
        const post = { email: email, password: password };
        const res = await axios.post('http://localhost:3000/User/api/login', post);
        setFetchData(res.data.data.name);
        setUserDetails(res.data.data);
        localStorage.setItem('token', res.data.data.token);
        localStorage.setItem('custId', res.data.data.customerId);
        setShowData(true);
        enteredPassword.current.value = '';
        enteredEmail.current.value = '';
        setEmail('');
        setPassword('');
      } else if (!email) {
        setEmailError(true);
        setTimeout(() => {
          setEmailError(false);
        }, 2000);
      } else if (!password) {
        setPasswordError(true);
        setTimeout(() => {
          setPasswordError(false);
        }, 2000);
      }
    } catch (err) {
      setEmailError(true);
      setPasswordError(true);
      setTimeout(() => {
        setPasswordError(false);
        setEmailError(false);
      }, 2000);
    }
  };
  const onEmailChange = e => {
    var email = e.target.value;
    if (validator.isEmail(email)) {
      setEmail(e.target.value);
    }
  };
  const onPasswordChange = e => {
    if (e.target.value.length >= 8) {
      setPassword(e.target.value);
    }
  };
  const onClickLogout = e => {
    e.preventDefault();
    //TODO also remove local storage
    localStorage.clear();
    setShowData(false);
  };
  const onClickDetails = e => {
    e.preventDefault();
    setShowDetails(true);
  };
  const onBack = e => {
    setShowDetails(false);
  };

  return (
    <React.Fragment>
      {showData ? (
        <div>
          <div className={showDetails ? styles.hide : ''}>
            <h1>User name is {fetchData}</h1>
            <button className="btn" onClick={onClickLogout}>
              Logout
            </button>
            <button className="btn" onClick={onClickDetails}>
              User Details
            </button>
          </div>
          {showDetails ? <Details data={useDetails} back={onBack} /> : ''}
        </div>
      ) : (
        ''
      )}
      <div className={showData ? `${styles.hide}` : ''}>
        {passwordError || emailError ? (
          <div className={styles.errorModal}>
            <p>Invalid Email and Password</p>
          </div>
        ) : (
          ''
        )}
        <form className={signup ? `${styles.hide}` : `${styles.form}`}>
          <input
            type="email"
            className={styles.input}
            ref={enteredEmail}
            className={emailError ? `${styles.emailError} ${styles.input}` : styles.input}
            onChange={onEmailChange}
            required
            placeholder="Email"
          />
          <input
            type="password"
            ref={enteredPassword}
            onChange={onPasswordChange}
            className={ passwordError ? `${styles.passwordError} ${styles.input}` : styles.input}
            required
            placeholder="Password"
          />
          <button className="btn" onClick={clickOnLogin}>
            Login
          </button>
          <button className="btn" onClick={signupHandler}>
            Signup
          </button>
        </form>
        {signup ? <Signup signupState={onLoginClick} /> : ''}
      </div>
    </React.Fragment>
  );
};

export default Login;


