import React from 'react';
import Winners from '../../media/winners';
import Rocket from '../../media/rocket';
import Stars from '../../media/stars';
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
        <ServicesCard topPredictions={topPredictions} img={Winners} rank={1} />
        <ServicesCard topPredictions={topPredictions} img={Rocket} rank={2} />
        <ServicesCard topPredictions={topPredictions} img={Stars} rank={3} />
      </ServicesWrapper>
    </ServicesContainer>
  );
};

Services.propTypes = {
  predictions: CustomPropTypes.predictions,
};

Services.defaultProps = {
  predictions: null,
};

export default Services;
