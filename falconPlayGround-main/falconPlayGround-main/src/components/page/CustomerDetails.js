import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Media,
  Row,
} from 'reactstrap';
import Loader from '../common/Loader';
import ButtonIcon from '../common/ButtonIcon';
import FalconCardHeader from '../common/FalconCardHeader';
import axios from 'axios';

let obj = {};
const CustomerSummary = () => {
    const [loading , setLoading] = React.useState(true);
    React.useEffect(() => {
      (async function(){
        try{
        const payload = {
          customer_id : localStorage.getItem('customer_id')
        }
        const user = await axios.post(`${process.env.REACT_APP_PORT}/getData/user`, payload);
        obj = user.data.body;
        setTimeout(() => {
          setLoading(false);
        })
      }catch(err){
        console.log(err.message);
      }
      })();
    },[])
    const { name, email, createdAt } = obj;

  
  return (
        <Card className="mb-3"> 
        {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <CardHeader>
            <Row>
              <Col>
                <h5 className="mb-2">
                  {name} (<a href={`mailto:${email}`}>{email}</a>)
                </h5>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="border-top">
            <Media>
              <FontAwesomeIcon icon="user" transform="down-5" className="text-success mr-2" />
              <Media body>
                <p className="mb-0">Customer was created</p>
                <p className="fs--1 mb-0 text-600">{createdAt.substring(0,10)}</p>
              </Media>
            </Media>
          </CardBody>
        </Fragment>
      )}
    </Card> 
)};

const CustomerDetailRow = ({ title, isLastItem, children }) => (
  <Row>
    <Col xs={5} sm={4}>
      <p
        className={classNames('font-weight-semi-bold', {
          'mb-0': isLastItem,
          'mb-1': !isLastItem
        })}
      >
        {title}
      </p>
    </Col>
    <Col>{children}</Col>
  </Row>
);

CustomerDetailRow.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isLastItem: PropTypes.bool
};

CustomerDetailRow.defaultProps = { last: false };

const CustomerDetail = () => {
  const [loading, setLoading] = React.useState(true);
  setTimeout(() => {
    setLoading(false)
  }, 1500);
  const { email, createdAt,
    city, country, line, 
    postal_code, state, customerId } = obj;
  const address = `${line}, ${city}, ${state}, ${postal_code}, ${country}`;
  
  return (
    <Card className="mb-3">
      <FalconCardHeader title="User Details">
      <ButtonIcon color="falcon-default" size="sm" icon="pencil-alt" iconClassName="fs--2">
          <Link to="/dashboard/card-details/update-user-details">
          Update details
          </Link>
        </ButtonIcon>
      </FalconCardHeader>
      <CardBody className="bg-light border-top">
      {loading ? (
          <Loader />
        ) : (<Row>
            <Col lg className="col-xxl-5">
              <h6 className="font-weight-semi-bold ls mb-3 text-uppercase">Account Information</h6>
              <CustomerDetailRow title="CUSTOMER_ID">{customerId}</CustomerDetailRow>
              <CustomerDetailRow title="Created">{createdAt.substring(0,10)}</CustomerDetailRow>
              <CustomerDetailRow title="Email">
                <a href={`mailto:${email}`}>{email}</a>
              </CustomerDetailRow>
            </Col>
            <Col lg className="col-xxl-5 mt-4 mt-lg-0 offset-xxl-1">
              <h6 className="font-weight-semi-bold ls mb-3 text-uppercase">Billing Information</h6>
              <CustomerDetailRow title="Send email to">
                <a href={`mailto:${email}`}>{email}</a>
              </CustomerDetailRow>
              <CustomerDetailRow title="Address">
                <p className="mb-1">{address}</p>
              </CustomerDetailRow>
            </Col>
          </Row> ) }
      </CardBody>
    </Card>
  );
};

const DeveloperDetail = () => {
  const [loading, setLoading] = React.useState(true);
  const [API_KEY ,setAPI_KEY] = React.useState('');
  const [cardId, setCardId] = React.useState('');
  const [webhook, setWebhook] = React.useState('');
  const [isDisable, setIsDisable] = React.useState(true);
  const [showWebhook, setShowWebhook] = React.useState(true);
  React.useEffect(() => {
    (async function(){
    try{
    const payload = {
      customer_id : localStorage.getItem('customer_id')
    }
    const user = await axios.post(`${process.env.REACT_APP_PORT}/getData/user`, payload);
    const data = user.data.body;
    if(data.api_key) {
      setCardId("active");
    }
    if(data.webhook){
      setWebhook(data.webhook);
      setShowWebhook(false);
    }
    setAPI_KEY(data.api_key);
    setTimeout(() => {
      setLoading(false);
    })
  }catch(err){
    setLoading(false);
  }
  })()
  },[])
  // copying the api key on clickboard
  const onCopyHandler = (e) => {
    e.preventDefault();
    let copyText = document.getElementById("api_key");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    toast.success("API KEY copied");
  }
  const onCopyWebhookHandler = (e) => {
    e.preventDefault();
    let copyText = document.getElementById("Webhook");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    toast.success("Webhook copied");
  }
  const onWebhookChange = (e) => {
    setWebhook(e.target.value);
  }
  React.useEffect(()=>{
    setIsDisable(!webhook);
  },[webhook])
  const onWebhookSave = async (e) => {
    e.preventDefault();
    try{
      var regexQuery = "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
      var url = new RegExp(regexQuery,"i");
      if(!url.test(webhook)){
        throw new Error();
      }
      const payload = {
        token : localStorage.getItem('token'),
        webhook : webhook
      }
      const res = axios.post(`${process.env.REACT_APP_PORT}/User/api/webhook`, payload);
      setShowWebhook(false);
      toast.success("Webhook saved successfully");
    }catch(err){
      toast.error('Please provide a valid webhook');
    }
  }
  const onUpdateWebhook = (e) => {
    e.preventDefault();
    setShowWebhook(pre => !pre);
    setTimeout(() => {
      document.getElementById('enterWebhook').focus();
    })
  }
  return ( <>
    { loading ?  <Loader /> :
    <Card className="mb-3">
      { cardId === 'active' ?  
      <>
      <FalconCardHeader title="Developer Details">
      { showWebhook ? '' : 
        <ButtonIcon onClick={onUpdateWebhook} color="falcon-default" size="sm" icon="pencil-alt" iconClassName="fs--2">        
         Update Webhook
        </ButtonIcon>
      }
      </FalconCardHeader>
      <CardBody className="bg-light border-top">
      <Row>
        <Col>
       <div>
        <h5>Your Api Key</h5>
        <input id='api_key' style={{width: '500px', overflowX: 'scroll', display: 'inline', marginRight: '5px'}} value = {API_KEY} />
        <i onClick = {onCopyHandler} class="fas fa-copy"></i>
      </div>
      {showWebhook ?    
      <>
        <h5 style={{marginTop : '10px', marginBottom : '10px'}}>Enter Webhook</h5>
        <input id="enterWebhook" style={{width: '500px', overflowX: 'scroll', display: 'block'}} onChange={onWebhookChange} placeholder="https://"/>
        <Button color="primary"  className="mt-3" onClick = {onWebhookSave} disabled={isDisable}>Save</Button>   
      </>
      :<>
      <h5 style={{marginTop : '10px', marginBottom : '10px'}}>Your Webhook</h5>
      <input id="Webhook" style={{width: '500px', overflowX: 'scroll', display: 'inline', marginRight: '5px'}} value={webhook} />
      <i onClick = {onCopyWebhookHandler} class="fas fa-copy"></i>
      </>
        }
      </Col>
      </Row>
      </CardBody>
      </>
      : ""}
    </Card> 
    }
    </>
  );
};

const CustomerDetails = () => {
  return(<>
  <Fragment>
    <CustomerSummary />
    <CustomerDetail />
    <DeveloperDetail />
  </Fragment>
  </>
  )
};

export default CustomerDetails;
