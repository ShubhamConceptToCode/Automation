import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import Section from '../components/common/Section';
import Login from "../components/auth/basic/Login";
import Loader from '../components/common/Loader';
import { useHistory } from 'react-router-dom';

const AuthLogin = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if(localStorage.getItem('token')){
      history.push('/dashboard');
    }
    setTimeout(() => {
      setLoading(false);
    })
  },[]);
  
  return (
  <>{loading ? <Loader /> :
  <Section className="py-0">
    <Row className="flex-center min-vh-100 py-6">
      <Col sm={10} md={8} lg={6} xl={5} className="col-xxl-4">
        <Card>
          <CardBody className="fs--1 font-weight-normal p-5">
            <Login />
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Section>
  }
  </>
  )
};

export default AuthLogin;