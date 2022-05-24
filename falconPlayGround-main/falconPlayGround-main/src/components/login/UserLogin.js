import React from 'react';
import axios from 'axios';
import styles from './login.module.css';
import Details from './Details';
import Login from './Login';

const UserLogin = () => {
  const [useDetails, setUserDetails] = React.useState({});
  const [showDetails, setShowDetails] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [showData, setShowData] = React.useState('');
  React.useEffect(() => {
    if (localStorage.getItem('token') !== undefined) {
      (async function() {
        const post = { token: localStorage.getItem('token') };
        const res = await axios.post('http://localhost:3000/api/data', post);
        setShowData(res.data.name);
        setUserDetails(res.data);
      })();
    }
  }, []);
  setTimeout(() => {
    setShow(true);
  }, 200);
  const onClickLogout = e => {
    e.preventDefault();
    //TODO also remove local storage
    localStorage.clear();
    setShowData('');
  };
  const onClickDetails = e => {
    e.preventDefault();
    setShowDetails(true);
  };
  const onBack = e => {
    setShowDetails(false);
  };
  return (
    <>
      {showData ? (
        <>
          <div className={showDetails ? styles.hide : ''}>
            <div className={styles.details}>
              <h1>User name is {showData}</h1>
              <button className="btn" onClick={onClickLogout}>
                Logout
              </button>
              <button className="btn" onClick={onClickDetails}>
                User Details
              </button>
            </div>
          </div>
          {showDetails ? <Details data={useDetails} back={onBack} /> : ''}
        </>
      ) : (
        <>{show ? <Login /> : ''}</>
      )}
    </>
  );
};

export default UserLogin;
