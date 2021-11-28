import React from 'react';
import { getAnalytics, logEvent } from 'firebase/analytics';
import Footer from '../components/Footer';
import PredictionTable from '../components/PredictionTable';
import InfoSection from '../components/InfoSection';
import { predictionDescription } from '../components/InfoSection/Data';
import LogoBanner from '../components/LogoBanner';
import CustomPropTypes from '../types/CustomPropTypes';

const Predictions = function predictionsOverview({ user, predictions }) {
  React.useEffect(() => {
    const analytics = getAnalytics();
    logEvent(analytics, 'screen_view', {
      firebase_screen: 'predictions',
      firebase_screen_class: 'interactive',
    });
  }, []);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <LogoBanner user={user} />
      <InfoSection data={predictionDescription} />
      <PredictionTable predictions={predictions} />
      <Footer />
    </div>
  );
};

Predictions.propTypes = {
  user: CustomPropTypes.user,
  predictions: CustomPropTypes.predictions,
};

Predictions.defaultProps = {
  user: null,
  predictions: null,
};

export default Predictions;
