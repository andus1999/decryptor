import * as React from 'react';
import { Scatter, defaults } from 'react-chartjs-2';
import Colors from '../../styles/Colors';
import { Card, CardContainer } from '../CardElements';
import 'chartjs-adapter-date-fns';
import { LineChartOptions } from '../../styles/Themes';
import CustomPropTypes from '../../types/CustomPropTypes';

const Volume = function volumeCard({ historicalData }) {
  defaults.font.family = 'Sora';
  defaults.font.size = 16;

  const volumes = historicalData
    ?.map((item) => ({ x: item.timestamp * 1000, y: item.volume / 1000000 })).slice(-30);

  const data = {
    datasets: [
      {
        label: 'Volumes',
        data: volumes,
        borderColor: Colors.primary,
        backgroundColor: Colors.white,
        cubicInterpolationMode: 'monotone',
        tension: 0.8,
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
          Volume Chart
        </h2>
        <div style={{
          paddingBottom: '20px',
          color: Colors.grey,
          fontWeight: 400,
        }}
        >
          Volume in Million USD
        </div>
        <div style={{
          minHeight: '350px',
        }}
        >
          {historicalData == null ? (
            <p style={{
              textAlign: 'center',
              lineHeight: '350px',
            }}
            >
              Loading...
            </p>
          ) : (
            <Scatter
              data={data}
              options={LineChartOptions}
            />
          )}
        </div>
      </Card>
    </CardContainer>
  );
};

Volume.propTypes = {
  historicalData: CustomPropTypes.historicalData,
};

Volume.defaultProps = {
  historicalData: null,
};

export default Volume;
