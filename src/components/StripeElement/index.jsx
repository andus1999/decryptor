import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Colors from '../../styles/Colors';
import { Card, CardContainer } from '../CardElements';
import Form from './Form';
import CustomPropTypes from '../../types/CustomPropTypes';

function getCurrencySymbol(currency) {
  if (currency === 'eur') {
    return '€';
  }
  if (currency === 'usd') {
    return '$';
  }
  return '';
}

const StripeElement = function stripeReactElement({ user, currency, amount }) {
  return (
    <div style={{
      textAlign: 'center',
      margin: '100px 0',
    }}
    >
      <CardContainer style={{ maxWidth: '600px' }}>
        <Card variant="outlined" style={{ textAlign: 'center' }}>
          <h1 style={{
            margin: '20px',
          }}
          >
            Submit your Payment Details
          </h1>
          <h3 style={{
            margin: '30px',
            color: Colors.primary,
          }}
          >
            Order for
            {' '}
            {amount}
            {' '}
            API calls.
          </h3>
          <h2 style={{
            margin: '30px',
          }}
          >
            Price:
            {' '}
            {(amount / 100).toFixed(2)}
            {' '}
            {getCurrencySymbol(currency)}
          </h2>
          {user
            ? (
              <div>
                {(amount && currency)
                  ? (
                    <Form
                      amount={amount}
                      currency={currency}
                      user={user}
                    />
                  )
                  : <p>Oops, something went wrong...</p>}
              </div>
            )
            : (
              <Button
                variant="contained"
                component={Link}
                to="/sign-in"
              >
                Sign in
              </Button>
            )}
        </Card>
      </CardContainer>
    </div>
  );
};

StripeElement.propTypes = {
  user: CustomPropTypes.user,
  amount: CustomPropTypes.number.isRequired,
  currency: CustomPropTypes.string.isRequired,
};

StripeElement.defaultProps = {
  user: null,
};

export default StripeElement;
