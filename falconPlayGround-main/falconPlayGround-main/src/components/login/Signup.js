import React from 'react';
import styles from './login.module.css';
import validator from 'validator';
import axios from 'axios';
import Details from './Details';

const Signup = props => {
  const [showDetails, setShowDetails] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({});
  const [fetchData, setFetchData] = React.useState('');
  const [showData, setShowData] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [Line, setLine] = React.useState('');
  const email = React.useRef();
  const password = React.useRef();
  const enteredConfirmPassword = React.useRef();
  const name = React.useRef();
  const onClickHandler = () => {
    props.signupState();
  };

  const clickOnSignup = async e => {
    e.preventDefault();
    try {
      if (!userName) {
        setError(true);
        setErrorMessage('Entered name is not valid');
        setTimeout(() => {
          setError(false);
        }, 2000);
      } else if (!userEmail) {
        setError(true);
        setErrorMessage('Entered email is not valid');
        setTimeout(() => {
          setError(false);
        }, 2000);
      } else if (!userPassword) {
        setError(true);
        setErrorMessage('Entered password is not valid');
        setTimeout(() => {
          setError(false);
        }, 2000);
      }
      if (userPassword !== confirmPassword) {
        setError(true);
        setErrorMessage('password and confirm password are not same');
        setTimeout(() => {
          setError(false);
        }, 2000);
      } else if (userEmail && userPassword) {
        //TODO api call.
        const post = { name: userName, email: userEmail, password: userPassword, passwordConfirm: confirmPassword };
        const res = await axios.post('http://localhost:3000/User/api/signup', post);
        email.current.value = '';
        password.current.value = '';
        enteredConfirmPassword.current.value = '';
        name.current.value = '';
        setFetchData(res.data.data.name);
        setUserDetails(res.data.data);
        localStorage.setItem('token', res.data.data.token);
        setUserEmail('');
        setUserPassword('');
        setShowData(true);
      }
    } catch (err) {
      console.log('error form here', err.message);
      setError(true);
      setErrorMessage('Entered email is not valid');
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  const onNameChange = e => {
    if (e.target.value.length > 5) {
      setUserName(e.target.value);
    } else {
      setUserName('');
    }
  };
  const onPasswordChange = e => {
    if (e.target.value.length >= 8) {
      setUserPassword(e.target.value);
    } else {
      setUserPassword('');
    }
  };
  const onEmailChange = e => {
    var email = e.target.value;
    if (validator.isEmail(email)) {
      setUserEmail(e.target.value);
    } else {
      setUserEmail('');
    }
  };

  const onConfirmPasswordChange = e => {
    if (e.target.value === userPassword) {
      setConfirmPassword(e.target.value);
    } else {
      setConfirmPassword('');
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
  const onBack = () => {
    setShowDetails(false);
  };

  return (
    <>
      {showData ? (
        <div>
          <div className={showDetails ? styles.hide : ''}>
            <h1>User name is {fetchData}</h1>
            <button className="btn btn__edit" onClick={onClickLogout}>
              Logout
            </button>
            <button className="btn btn__edit" onClick={onClickDetails}>
              User Details
            </button>
          </div>
          {showDetails ? <Details data={userDetails} back={onBack} /> : ''}
        </div>
      ) : (
        ''
      )}
      <div className={showData ? `${styles.hide}` : ''}>
        {error ? (
          <div className={styles.errorModal}>
            <p>{errorMessage}</p>
          </div>
        ) : (
          ''
        )}
        <form className={styles.form}>
          <h3>Sign Up</h3>
          <input type="text" className={styles.input} ref={name} onChange={onNameChange} required placeholder='Name'/>
          <input type="email" className={styles.input} ref={email} onChange={onEmailChange} required placeholder='Email' />
          <input type="password" className={styles.input} ref={password} onChange={onPasswordChange} required placeholder='Password'/>
          <input
            type="password"
            className={styles.input}
            ref={enteredConfirmPassword}
            onChange={onConfirmPasswordChange}
            required 
            placeholder='ConfirmPassword'
          />
          <h5>Address</h5>
          <input placeholder='Line' required type="text"/>
          <label>City</label>
          <input />
          <label>State</label>
          <input />
          <label>Country</label>
          <input />
          <label>Pin Code</label>
          <input />
          <button className="btn" onClick={clickOnSignup}>
            Signup
          </button>
          <button className="btn" onClick={onClickHandler}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
