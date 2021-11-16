import React from 'react'
import { Colors } from '../../styles/Colors';
import { Card, CardContainer } from '../CardElements';
import Form from './Form';

function getCurrencySymbol(currency){
  if (currency === "eur"){
      return "€"
  }
  if (currency === "usd"){
      return "$"
  }
}

export default function StripeElement(props){  
  return (
    <div style={{
      textAlign: 'center',
      margin: '100px 0',
    }}>
      <CardContainer style={{maxWidth: '600px'}}>
        <Card variant='outlined' style={{textAlign: 'center'}}>
          <h1 style={{
            margin: '20px',
          }}>Submit your Payment Details</h1>
          <h3 style={{
            margin: '30px',
            color: Colors.primary,
          }}>Order for {props.amount} API calls.</h3>
          <h2 style={{
            margin: '30px',
          }}>Price: {(props.amount/100).toFixed(2)} {getCurrencySymbol(props.currency)}</h2>
          <Form
            amount={props.amount} 
            currency={props.currency}
            user={props.user}
            />          
        </Card>
      </CardContainer>
    </div>
  )
};
