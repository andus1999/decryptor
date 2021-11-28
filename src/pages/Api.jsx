import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getAnalytics, logEvent } from 'firebase/analytics';
import ApiEndpoints from '../components/ApiEndpoints';
import ApiOverview from '../components/ApiOverview';
import Footer from '../components/Footer';
import InfoSection from '../components/InfoSection';
import { apiDescription } from '../components/InfoSection/Data';
import LogoBanner from '../components/LogoBanner';
import PaymentDialog from '../components/StripeElement/PaymentDialog';
import CustomPropTypes from '../types/CustomPropTypes';

const Api = function apiInfo({ user }) {
  React.useEffect(() => {
    const analytics = getAnalytics();
    logEvent(analytics, 'screen_view', {
      firebase_screen: 'api',
      firebase_screen_class: 'interactive',
    });
  }, []);

  let stripePromise = null;
  if (window.location.hostname === 'localhost') {
    stripePromise = loadStripe('pk_test_51Jrpx0Ke5TUGpxZvikMyMs900upQAhCeDB2ozEDDptm0I5LwE537WYIEnbdkKgV1xLbVSuNbR9OTes3yRafwfVt800MmOtk07w');
  } else {
    stripePromise = loadStripe('pk_live_51Jrpx0Ke5TUGpxZvEiomXVy7xlRLB5wx75iLEubyMLglfNhynjzsFEbkWOEU5VGtanYXEDL4B9J41uJKTbIlqKY800J2Yct2LW');
  }
  return (
    <div style={{ backgroundColor: 'white' }}>
      <LogoBanner user={user} />
      <InfoSection data={apiDescription} />
      <ApiOverview user={user} />
      <ApiEndpoints user={user} />
      <Elements stripe={stripePromise}>
        <PaymentDialog />
      </Elements>
      <Footer />
    </div>
  );
};

Api.propTypes = {
  user: CustomPropTypes.user,
};

Api.defaultProps = {
  user: null,
};

export default Api;
