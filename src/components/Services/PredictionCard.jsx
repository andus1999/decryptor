import React from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
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
  const link = prediction.coin_id;
  return `/predictions/${link}`;
}

const PredictionCard = function servicesCardComponent({ topPredictions, img, rank }) {
  const prediction = topPredictions?.[rank - 1];
  return (
    <CardContainer>
      <Card
        variant="outlined"
      >
        {prediction
          ? (
            <ServicesCard style={{ height: '450px' }}>
              <div style={{height: '160px', display: 'flex', alignItems: 'center'}}>
                <ServicesIcon src={img} />
              </div>
              <ServicesH2>{`${rank}. ${prediction.name}`}</ServicesH2>
              <div style={{
                height: '200px',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'column',
                marginBottom: '20px',
                rowGap: '20px',
              }}
              >
                <Divider style={{ width: '100%' }} />
                <p style={pStyle}>Prediction</p>
                <ServicesP>{`${round(prediction.prediction.average)} %`}</ServicesP>
              </div>
              <Button
                component={Link}
                to={getLink(prediction)}
                variant="contained"
              >
                Show Details
              </Button>
            </ServicesCard>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '450px',
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
  topPredictions: CustomPropTypes.topPredictions,
  img: CustomPropTypes.string.isRequired,
  rank: CustomPropTypes.number.isRequired,
};

PredictionCard.defaultProps = {
  topPredictions: null,
};

export default PredictionCard;
