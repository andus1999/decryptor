import React from 'react';
import { Bar, defaults } from 'react-chartjs-2';
import { Card, CardContainer } from '../CardElements';
import Colors from '../../styles/Colors';
import CustomPropTypes from '../../types/CustomPropTypes';

const Boxplot = function boxplotCard({ prediction }) {
  defaults.font.family = 'Sora';
  defaults.font.size = 16;
  const { low } = prediction.prediction;
  const { average } = prediction.prediction;
  const { high } = prediction.prediction;

  const data = {
    labels: ['Low', 'High'],
    datasets: [{
      data: [[low, average],
        [average, high]],
      backgroundColor: Colors.primary,
      borderRadius: 10,
      borderSkipped: false,
    }],
  };

  return (
    <CardContainer>
      <Card variant="outlined">
        <h2 style={{ paddingBottom: '20px' }}>Prediction Spread</h2>
        <div style={{
          paddingBottom: '20px',
          color: Colors.grey,
          fontWeight: 400,
        }}
        >
          High and low predictions
        </div>
        <div style={{ height: '350px' }}>
          <Bar
            data={data}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                tooltip: {
                  titleColor: Colors.black,
                  bodyColor: Colors.black,
                  backgroundColor: Colors.white,
                },
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </Card>
    </CardContainer>
  );
};

Boxplot.propTypes = {
  prediction: CustomPropTypes.prediction.isRequired,
};

export default Boxplot;
