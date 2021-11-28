import React from 'react';
import { Scatter, defaults } from 'react-chartjs-2';
import Colors from '../../styles/Colors';
import { Card, CardContainer } from '../CardElements';
import 'chartjs-adapter-date-fns';
import { LineChartOptions } from '../../styles/Themes';
import CustomPropTypes from '../../types/CustomPropTypes';

const convertTimeStamp = (timestamp) => (timestamp + 3600 * 24) * 1000;

const ChartView = function chartViewCard({ historicalData, prediction }) {
  defaults.font.family = 'Sora';
  defaults.font.size = 16;
  const currentPrice = prediction.market_data.close;
  const targetPrice = currentPrice * (1 + prediction.prediction.average);
  const targetPriceLow = currentPrice * (1 + prediction.prediction.low);
  const targetPriceHigh = currentPrice * (1 + prediction.prediction.high);
  const predictionTimeStamp = prediction.prediction.timestamp;
  const predictions = historicalData
    ?.map((x) => ({ x: convertTimeStamp(x.timestamp), y: x.close }));
  predictions?.push({ x: predictionTimeStamp * 1000, y: targetPrice });
  const lows = [
    predictions?.at(-2),
    { x: predictionTimeStamp * 1000, y: targetPriceLow },
  ];
  const highs = [
    predictions?.at(-2),
    { x: predictionTimeStamp * 1000, y: targetPriceHigh },
  ];

  const data = {
    datasets: [
      {
        label: 'Predictions',
        data: predictions,
        borderColor: Colors.primary,
        backgroundColor: Colors.white,
        cubicInterpolationMode: 'monotone',
        tension: 0.8,
        showLine: true,
      },
      {
        label: 'Lowest Predictions',
        data: lows,
        borderColor: Colors.primaryLight,
        backgroundColor: Colors.white,
        tension: 0.2,
        showLine: true,
      },
      {
        label: 'Highest Predictions',
        data: highs,
        borderColor: Colors.primaryLight,
        backgroundColor: Colors.white,
        tension: 0.6,
        showLine: true,
      },
    ],
  };
  return (
    <CardContainer style={{ maxWidth: '680px' }}>
      <Card variant="outlined">
        <h2 style={{
          paddingBottom: '20px',
        }}
        >
          Prediction Chart
        </h2>
        <div style={{
          paddingBottom: '20px',
          color: Colors.grey,
          fontWeight: 400,
        }}
        >
          Prices in USD
        </div>
        {historicalData ? (
          <div style={{
            minHeight: '350px',
          }}
          >
            <Scatter
              data={data}
              options={LineChartOptions}
            />
          </div>
        ) : (
          <p style={{
            textAlign: 'center',
            lineHeight: '350px',
          }}
          >
            Loading...
          </p>
        )}
      </Card>
    </CardContainer>
  );
};

ChartView.propTypes = {
  historicalData: CustomPropTypes.historicalData.isRequired,
  prediction: CustomPropTypes.prediction.isRequired,
};

export default ChartView;
