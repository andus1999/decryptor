import React from 'react';
import Winners from '../../media/winners.svg';
import Rocket from '../../media/rocket.svg';
import Stars from '../../media/stars.svg';
import CustomPropTypes from '../../types/CustomPropTypes';
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
} from './ServicesElements';
import ServicesCard from './PredictionCard';

const Services = function servicesCards({ predictions }) {
  const topPredictions = predictions ? Object.keys(predictions).map((key) => predictions[key])
    .sort((a, b) => (b.prediction.average - a.prediction.average)) : null;
  return (
    <ServicesContainer id="topPredictions">
      <ServicesH1>Top Predictions</ServicesH1>
      <ServicesWrapper>
        <ServicesCard prediction={topPredictions?.[0]} img={Winners} />
        <ServicesCard prediction={topPredictions?.[1]} img={Rocket} />
        <ServicesCard prediction={topPredictions?.[2]} img={Stars} />
      </ServicesWrapper>
    </ServicesContainer>
  );
};

Services.propTypes = {
  predictions: CustomPropTypes.predictions.isRequired,
};

export default Services;
