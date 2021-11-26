import React from 'react';
import { Doughnut, defaults } from 'react-chartjs-2';
import Colors from '../../styles/Colors';
import { Card, CardContainer } from '../CardElements';
import { DoughnutChartOptions } from '../../styles/Themes';
import CustomPropTypes from '../../types/CustomPropTypes';

const Volatility = function volatilityCard({ prediction }) {
  defaults.font.family = 'Sora';
  defaults.font.size = 16;
  const volatility = Math.round(prediction.prediction.volatility * 100);

  const data = {
    datasets: [{
      data: [volatility, 100 - volatility],
      backgroundColor: [
        Colors.primary,
        Colors.lightGrey,
      ],
      hoverOffset: 4,
    }],
  };

  return (
    <CardContainer>
      <Card variant="outlined">
        <h2 style={{ paddingBottom: '20px' }}>Volatility Score</h2>
        <div style={{
          paddingBottom: '20px',
          color: Colors.grey,
          fontWeight: 400,
        }}
        >
          Expected Volatility
        </div>
        <div style={{ height: '350px' }}>
          <div style={{ paddingTop: '20px' }}>
            <p style={{
              textAlign: 'center',
              height: '40px',
            }}
            >
              {`${volatility} Points`}
            </p>
            <Doughnut
              data={data}
              options={DoughnutChartOptions}
            />
          </div>
        </div>
      </Card>
    </CardContainer>
  );
};

Volatility.propTypes = {
  prediction: CustomPropTypes.prediction.isRequired,
};

export default Volatility;
