import { version } from './config';



export const Subscribe = {
  name: 'Subscription',
  to: '/dashboard/subscribe',
  exact: true,
} 

export const CardDetails = {
  name: 'Other Details',
  to : '/dashboard/card-details',
  exact: true,
}

export const Invoice = {
  name : "Invoices",
  to:'/dashboard/invoice',
  exact: true
}

export default [
  Subscribe,
  CardDetails,
  Invoice
];
