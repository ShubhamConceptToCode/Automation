import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Loader from '../common/Loader';
import classNames from 'classnames';
import ButtonIcon from '../common/ButtonIcon';
import {
  Button,
  Card,
  CardBody,
  Col,
  CustomInput,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  UncontrolledDropdown,
  UncontrolledTooltip
} from 'reactstrap';
import ContentWithAsideLayout from '../../layouts/ContentWithAsideLayout';
import FalconCardHeader from '../common/FalconCardHeader';
import iconPaypalFull from '../../assets/img/icons/icon-paypal-full.png';
import iconPaymentMethods from '../../assets/img/icons/icon-payment-methods.png';
import PageHeader from '../common/PageHeader';
import FaqCol from '../faq/FaqCol';
import { isIterableArray } from '../../helpers/utils';
import countries from '../../data/billing/countries';

export const BillingBanner = () => (
  <PageHeader
    title="Get started with Subscription"
    description="$10.00 per month"
    className="mb-3"
  >
  </PageHeader>
);

const BillingContent = () => {
  const [method, setMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [country, setCountry] = useState('United States');
  const [zip, setZip] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isDisabled , setIsDisabled] = useState(true);
  const history = useHistory();
  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';
  useEffect(() => {
    setIsDisabled( !cardNumber || !cardName || !country || !zip || !expDate || !cvv );
  },[cardNumber,cardName,country,zip,expDate,cvv])
  const onClickHandler = async () => {
    const arr = expDate.split('/');
    const payload = {
      number: cardNumber,
      exp_month: arr[0],
      exp_year: arr[1],
      cvc: cvv,
      name: cardName,
      token: localStorage.getItem('token'),
      country:country
    };
    try {
      const res = await axios.post(`${process.env.REACT_APP_PORT}/subscriber/pay`, payload);
      console.log("this is form billing",res);
      localStorage.setItem('status', res.data.data.sub_status);
      localStorage.setItem('card_id', res.data.data.cardId);
      toast.success('Payment Successful');
      history.push('./dashboard')
    } catch (err) {
      console.log(err.message);
      toast.error('Payment Failed');
    }
  }
  return (
    <Card className="h-100">
      <FalconCardHeader title="Billing Details" light={false} />
      <CardBody className="bg-light">
        <Row tag={Form}>
          <Col>
            <CustomInput
              type="radio"
              name="billing"
              id="card"
              value="card"
              checked={method === 'card'}
              onChange={({ target }) => setMethod(target.value)}
              label={
                <span className="d-flex align-items-center">
                  <span className="fs-1 text-nowrap">Credit Card</span>
                  <img className="d-none d-sm-inline-block ml-2 mt-lg-0" src={iconPaymentMethods} height={20} alt="" />
                </span>
              }
            />
            <p className="fs--1 mb-4">
              Safe money transfer using your bank accounts. Visa, maestro, discover, american express.
            </p>

            <Row form>
              <Col>
                <FormGroup>
                  <Label className={labelClasses} for="cardNumber">
                    Card Number
                  </Label>
                  <Input
                    maxLength="16"
                    placeholder="XXXX XXXX XXXX XXXX"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={({ target }) => setCardNumber(target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label className={labelClasses} for="cardName">
                    Name of Card Holder
                  </Label>
                  <Input
                    placeholder="John Doe"
                    id="cardName"
                    value={cardName}
                    onChange={({ target }) => setCardName(target.value)}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col xs={6} sm={3}>
                <FormGroup>
                  <Label className={labelClasses} for="customSelectCountry">
                    Country
                  </Label>
                  <CustomInput
                    type="select"
                    id="country"
                    name="country"
                    value={country}
                    onChange={({ target }) => setCountry(target.value)}
                  >
                    {isIterableArray(countries) &&
                      countries.map((country, index) => (
                        <option value={country} key={index}>
                          {country}
                        </option>
                      ))}
                  </CustomInput>
                </FormGroup>
              </Col>
              <Col xs={6} sm={3}>
                <FormGroup className="form-group">
                  <Label className={labelClasses} for="zipCode">
                    Zip Code
                  </Label>
                  <Input placeholder="1234" id="zipCode" value={zip} onChange={({ target }) => setZip(target.value)} 
                  required
                  />
                </FormGroup>
              </Col>
              <Col xs={6} sm={3}>
                <FormGroup>
                  <Label className={labelClasses} for="expDate">
                    Exp Date
                  </Label>
                  <Input
                    placeholder="15/2024"
                    id="expDate"
                    value={expDate}
                    onChange={({ target }) => setExpDate(target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col xs={6} sm={3}>
                <FormGroup>
                  <Label className={labelClasses} for="cvv">
                    CVV
                    <FontAwesomeIcon icon="question-circle" className="ml-2 cursor-pointer" id="tooltipCVV" />
                    <UncontrolledTooltip placement="top" target="tooltipCVV">
                      Card verification value
                    </UncontrolledTooltip>
                  </Label>
                  <Input
                    placeholder="123"
                    maxLength="3"
                    id="cvv"
                    value={cvv}
                    onChange={({ target }) => setCvv(target.value)}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <Button color="primary"  className="mt-3" onClick={onClickHandler} disabled={isDisabled}>Pay</Button>
      </CardBody>
    </Card>
  );
};

const BillingAside = () => {
  const [plan, setPlan] = useState('monthly');

  return (
    <Card className="h-100">
      <FalconCardHeader title="Billing" light={false} />
      <CardBody tag={Form} className="bg-light" onSubmit={e => e.preventDefault()}>
        <CustomInput
          type="select"
          id="plan"
          name="plan"
          className="mb-3"
          value={plan}
          onChange={({ target }) => setPlan(target.value)}
        >
          <option value="annual">Annual Plan</option>
          <option value="monthly">Monthly Plan</option>
        </CustomInput>
        <div className="d-flex justify-content-between fs--1 mb-1">
          <p className="mb-0">Due in 30 days</p>
          <span>$375.00</span>
        </div>
        <div className="d-flex justify-content-between fs--1 mb-1 text-success">
          <p className="mb-0">Annual saving</p>
          <span>$75.00/yr</span>
        </div>
        <hr />
        <h5 className="d-flex justify-content-between">
          <span>Due today</span>
          <span>$0.00</span>
        </h5>
        <p className="fs--1 text-600">
          Once you start your trial, you will have 30 days to use Falcon Premium for free. After 30 days you’ll be
          charged based on your selected plan.
        </p>
        <Button type="submit" color="primary" block>
          <FontAwesomeIcon icon="lock" className="mr-2" />
          Start free trial
        </Button>
        <div className="text-center mt-2">
          <small className="d-inline-block">
            By continuing, you are agreeing to our subscriber <Link to="#!">terms</Link> and will be charged at the end
            of the trial.
          </small>
        </div>
      </CardBody>
    </Card>
  );
};
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
let object = {};
const CustomerCardDetail = () => {
  const [loading, setLoading] = React.useState(true);
  const [showData, setShowData] = React.useState(false);
  React.useEffect(() => {
    (async function(){
    try{
    const payload = {
      customer_id : localStorage.getItem('customer_id')
    }
    const user = await axios.post(`${process.env.REACT_APP_PORT}/getData/userCard`, payload);
    object = user.data.body;
    console.log(user);
    if(Object.keys(object).length != 0){
      setShowData(true);
    }
    console.log(object, 'this is object');
    console.log(object.customer);
  }catch(err){
    console.log(err.message);
  }finally{
    setTimeout(() => {
      setLoading(false)
    });
  }
})();
  },[])
  return ( <>
    { loading ?  <Loader /> :
    <Card className="mb-3">
      { showData ?  
      <>
      <FalconCardHeader title="Card Details">
        <ButtonIcon color="falcon-default" size="sm" icon="pencil-alt" iconClassName="fs--2">
        <Link to='/dashboard/card-details/update-card-details'>
         Update details
        </Link> 
        </ButtonIcon>
      </FalconCardHeader>
      <CardBody className="bg-light border-top">
      {loading ? (
          <Loader />
        ) : (<Row>
            <Col lg className="col-xxl-5">
              <h6 className="font-weight-semi-bold ls mb-3 text-uppercase">Card Information</h6>
              <CustomerDetailRow title="Name">{object.name}</CustomerDetailRow>
              <CustomerDetailRow title="CUSTOMER_ID">{object.customer}</CustomerDetailRow>
              
              <CustomerDetailRow title="Card">{object.brand}</CustomerDetailRow>
              
            </Col>
            <Col lg className="col-xxl-5 mt-4 mt-lg-0 offset-xxl-1">

              <CustomerDetailRow title="Exp month">{object.exp_month}</CustomerDetailRow>
              <CustomerDetailRow title="Exp year">{object.exp_year}</CustomerDetailRow>
              <CustomerDetailRow title="Card Number">******{object.last4}</CustomerDetailRow>
              
            </Col>
          </Row> ) }
      </CardBody>
      </>
      : <h3 style={{margin:'25px'}}>Card is not create</h3>}
    </Card> 
    
    }
    </>
  );
};

const Billing = () => {
  const [cardId, setCardId] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    (async function(){
    if(localStorage.getItem("card_id")) {
      setCardId("active");
    }
    const payload = {
      customer_id : localStorage.getItem('customer_id')
    }
    const user = await axios.post(`${process.env.REACT_APP_PORT}/getData/user`, payload);
    const data = user.data.body;
    
    setTimeout(() => {
      setLoading(false);
    })
  })()
  })
  const onCancelHandler =async (e) => {
    e.preventDefault();
    try{
    const ans = window.confirm('Really you want to cancel the subscription?');
    if(ans){
    const payload = {token: localStorage.getItem('token')};
    const res = await axios.post(`${process.env.REACT_APP_PORT}/subscriber/cancel`, payload);  
    localStorage.removeItem("card_id")
    setCardId("");
    setTimeout(() => {
      toast.success('Cancel Subscription Successful');
    })
    }
  }catch(err){
    console.log(err.message);
    toast.error("Not able to Cancel Subscription");
  }
  }
  

  return (<>{ loading ? <Loader/> :
    <>
    { cardId === "active" ? <>
    <PageHeader
      title="You are Subscribed"
      description="$10.00 per month"
      className="mb-3"
    >
    <Button color="primary"  className="mt-3" onClick={onCancelHandler}>Cancel Subscription</Button>
    </PageHeader> 
    <CustomerCardDetail />  
    </> :
    <ContentWithAsideLayout
      banner={<BillingBanner />}
      footer={<FaqCol />}
      isStickyAside={false}
    >
      <BillingContent />
    </ContentWithAsideLayout>
    }
    </>
  }

    </>
  );
};

export default Billing;
