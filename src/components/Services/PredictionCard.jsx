import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import CustomPropTypes from '../../types/CustomPropTypes';
import { CardContainer, Card } from '../CardElements';
import {
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from './ServicesElements';

import Colors from '../../styles/Colors';

const pStyle = {
  color: Colors.grey,
};

const round = (number) => Math.round(10000 * number) / 100;

function getLink(prediction) {
  const link = prediction.id;
  return `/predictions/${link}`;
}

const PredictionCard = function servicesCardComponent({ prediction, img }) {
  return (
    <CardContainer>
      <Card
        variant="outlined"
      >
        {prediction
          ? (
            <ServicesCard to={getLink(prediction)} style={{ height: '400px' }}>
              <ServicesIcon src={img} />
              <ServicesH2>{`1. ${prediction.name}`}</ServicesH2>
              <p style={pStyle}>Prediction</p>
              <ServicesP>{`${round(prediction.prediction.average)} %`}</ServicesP>
            </ServicesCard>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '400px',
            }}
            >
              <CircularProgress />
            </div>
          )}
      </Card>
    </CardContainer>
  );
};

PredictionCard.propTypes = {
  prediction: CustomPropTypes.prediction.isRequired,
  img: CustomPropTypes.string.isRequired,
};

export default PredictionCard;
