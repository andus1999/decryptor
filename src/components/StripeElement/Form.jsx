import React from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import Fade from '@mui/material/Fade';
import Colors from '../../styles/Colors';
import CustomPropTypes from '../../types/CustomPropTypes';

const Form = function paymentForm({ amount, user, currency }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const handleSubmit = async (event) => {
    setLoading(true);
    setError('Redicecting...');
    event.preventDefault();

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: (window.location.hostname === 'localhost') ? (
          `http://localhost:3000/api?amount=${amount
          }&currency=${currency
          }&uid=${user.uid}`
        ) : (
          `https://decryptor.xyz/api?amount=${amount
          }&currency=${currency
          }&uid=${user.uid}`
        ),
      },
    });
    if (result.error) {
      setLoading(false);
      setError(result.error.message);
    }
  };

  return (
    <form style={{ padding: '10px' }} onSubmit={handleSubmit}>
      <div>
        <PaymentElement onReady={() => setLoading(false)} />
      </div>
      {error && (
      <h3 style={{
        margin: '30px 0',
        color: Colors.primary,
      }}
      >
        {error}
      </h3>
      )}
      <div style={{
        padding: '0 0 20px',
        display: 'inline-block',
      }}
      >
        <div>
          <Fade in={loading}>
            <CircularProgress />
          </Fade>
        </div>
        <Fade in={!loading}>
          <Button
            variant="contained"
            size="large"
            type="submit"
          >
            Submit
          </Button>
        </Fade>
      </div>
    </form>
  );
};

Form.propTypes = {
  user: CustomPropTypes.user.isRequired,
  amount: CustomPropTypes.number.isRequired,
  currency: CustomPropTypes.string.isRequired,
};

export default Form;
