import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import { getAnalytics, logEvent } from 'firebase/analytics';
import Footer from '../components/Footer';
import LogoBanner from '../components/LogoBanner';
import StripeElement from '../components/StripeElement';
import Colors from '../styles/Colors';
import CustomPropTypes from '../types/CustomPropTypes';

const appearance = {
  theme: 'flat',

  variables: {
    colorPrimary: Colors.primary,
    colorText: Colors.white,
    colorDanger: Colors.primaryLight,
    fontFamily: 'Sora',
    spacingUnit: '5px',
    borderRadius: '20px',
    colorBackground: Colors.black,
  },
  rules: {
    '.Label': {
      color: Colors.white,
    },
  },
};

const Payments = function paymentScreen({ user }) {
  React.useEffect(() => {
    const analytics = getAnalytics();
    logEvent(analytics, 'screen_view', {
      firebase_screen: 'payment',
      firebase_screen_class: 'input',
    });
  }, []);

  let stripePromise = null;
  if (window.location.hostname === 'localhost') {
    stripePromise = loadStripe('pk_test_51Jrpx0Ke5TUGpxZvikMyMs900upQAhCeDB2ozEDDptm0I5LwE537WYIEnbdkKgV1xLbVSuNbR9OTes3yRafwfVt800MmOtk07w');
  } else {
    stripePromise = loadStripe('pk_live_51Jrpx0Ke5TUGpxZvEiomXVy7xlRLB5wx75iLEubyMLglfNhynjzsFEbkWOEU5VGtanYXEDL4B9J41uJKTbIlqKY800J2Yct2LW');
  }
  const location = useLocation();
  const paymentIntent = location.state.intent;

  const options = {
    clientSecret: paymentIntent.client_secret,
    appearance,
  };

  return (
    <div style={{ backgroundColor: 'white' }}>
      <LogoBanner user={user} />
      <Elements stripe={stripePromise} options={options}>
        <StripeElement
          amount={paymentIntent.metadata.amount}
          currency={paymentIntent.metadata.currency}
          user={user}
        />
      </Elements>
      <Footer />
    </div>
  );
};

Payments.propTypes = {
  user: CustomPropTypes.user,
};

Payments.defaultProps = {
  user: null,
};

export default Payments;
