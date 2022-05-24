import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardFooter, Col, Row, Table } from 'reactstrap';
import Loader from '../common/Loader';
import axios from 'axios';


let object = {};
const Invoice = () => {
  const [loading , setLoading] = useState(true);
  useEffect(()=>{
    (async function(){
      try{
      const payload = { customerId : localStorage.getItem('customer_id') };
      const res = await axios.post(`${process.env.REACT_APP_PORT}/subscriber/user-invoice`, payload);
      object = res.data.data
      console.log('onjebsadfjoisflsd',object);
      setTimeout(() => {
        setLoading(false);
      })
      }catch(err){
        console.log(err.message);
      }
    })();
  },[]); 
  
  return (
    <Fragment>
      <Card className="mb-3">
        <CardBody>
          {loading ? (
            <Loader />
          ) : (<>
            {Object.keys(object).length ? 
            <Row className="justify-content-between align-items-center">
            <Col  style={{marginBottom: '10px', color : '#2c7be5'}} md>
              <h5 className="mb-2 mb-md-0">Billing information</h5>
            </Col>
                <div className="table-responsive">
                  <Table >
                    <tbody>
                      <tr>
                        <th >Billing Period</th>
                        <th >Invoice PDF</th>
                        <th >Payment Receipt</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                      {object.map((ele) => {
                        return (
                        <tr>
                        <td>{ele.period_start} - {ele.period_end}</td>
                        <td><a href={ele.invoice_pdf}>download</a></td>
                        <td><a href={ele.receipt_url}>download</a></td>
                        <td>$ {ele.total/100}.00</td>
                        <tr className="alert-success font-weight-bold">
                        <td>{ele.status}</td>
                      </tr>
                      </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </div>
            </Row>
            : <h3>Not Subscribed Yet</h3>}
            </>
          )}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default Invoice;
