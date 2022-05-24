import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Loader from '../common/Loader';
import { toast } from 'react-toastify';
import {useHistory, Link} from 'react-router-dom';
import {  Card, CardBody ,Button, Form, Row, Col, FormGroup, Input, CustomInput, Label,UncontrolledTooltip } from 'reactstrap';
import Section from '../common/Section';
import { isIterableArray } from '../../helpers/utils';
import FalconCardHeader from '../common/FalconCardHeader';
import countries from '../../data/billing/countries';

const CardEditDetails = () => {
  const [method, setMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState(``);
  const [cardName, setCardName] = useState("");
  const [country, setCountry] = useState('United States');
  const [expDate, setExpDate] = useState(``);
  const [cvv, setCvv] = useState('');
  const [isDisable, setIsDisable] = useState('');
  const history = useHistory();
  const labelClasses = 'ls text-uppercase text-600 font-weight-semi-bold mb-0';
  useEffect(() =>
  setIsDisable(!cardNumber || !cardName || !country || !expDate || !cvv)
  ,[cardNumber, cardName, country, expDate, cvv]);
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
      const res = await axios.post(`${process.env.REACT_APP_PORT}/subscriber/update-card`, payload);
      console.log("this is form billing",res);
      localStorage.setItem('card_id', res.data.cardId);
      toast.success('Card Edited Successfully');
      history.push('/dashboard/subscribe');
    } catch (err) {
      console.log(err.res);
      toast.error(`Can't Edit Card Details`);
    }
  }
  const onBackHandler = (e) => {
    e.preventDefault();
    history.push('/dashboard/subscribe');
  }
  return (
    <Card className="h-100">
      <FalconCardHeader title="Edit Card Details" light={false} />
      <CardBody className="bg-light">
        <Row tag={Form}>
          <Col>
            <Row form>
              <Col>
                <FormGroup>
                  <Label className={labelClasses} for="cardNumber">
                    Card Number
                  </Label>
                  <Input
                    id="cardNumber"
                    maxLength = '16'
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
                <FormGroup>
                  <Label className={labelClasses} for="expDate">
                    Exp Date
                  </Label>
                  <Input
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
        <Button color="primary"  className="mt-3" style={{marginRight: '10px'}} onClick={onBackHandler}>Back</Button>
        <Button color="primary"  className="mt-3" onClick={onClickHandler} disabled={isDisable}>Save Changes</Button>
      </CardBody>
    </Card>
  );
}
let object = {};
const CardEdit = () => {
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
      (async function(){
        try{
          const payload = {
            customer_id : localStorage.getItem('customer_id')
          }
          const user = await axios.post(`${process.env.REACT_APP_PORT}/getData/userCard`, payload);
          object = user.data.body;
          setTimeout(() => {
            setLoading(false)
          }, 1500);
          console.log(object, 'this is object');
          console.log(object.customer);
        }catch(err){
          console.log(err.message);
        }
      })();  
      },[])

    return (<>
        {loading ? <Loader /> : <CardEditDetails data={object}/>}
        </>
    )
}

export default CardEdit;