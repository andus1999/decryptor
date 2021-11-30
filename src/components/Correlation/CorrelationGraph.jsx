import * as React from 'react';
import { Scatter, defaults } from 'react-chartjs-2';
import Colors from '../../styles/Colors';
import { Card, CardContainer } from '../CardElements';
import 'chartjs-adapter-date-fns';
import { LineChartOptions } from '../../styles/Themes';
import CustomPropTypes from '../../types/CustomPropTypes';

const CorrelationGraph = function correlationGraphCard({ modelData }) {
  defaults.font.family = 'Sora';
  defaults.font.size = 16;

  const correlation = modelData
    ?.correlation_data.slice(-30).map((item) => ({ x: item.timestamp * 1000, y: item.test_correlation }));

  const data = {
    datasets: [
      {
        label: 'Correlation',
        data: correlation,
        borderColor: Colors.primary,
        backgroundColor: Colors.white,
        cubicInterpolationMode: 'monotone',
        tension: 0.8,
        showLine: true,
      },
    ],
  };
  return (
    <CardContainer style={{ maxWidth: '550px' }}>
      <Card variant="outlined">
        <h2 style={{
          paddingBottom: '20px',
        }}
        >
          Correlation Chart
        </h2>
        <div style={{
          paddingBottom: '20px',
          color: Colors.grey,
          fontWeight: 400,
        }}
        >
          Showing pearson correlation on test set
        </div>
        <div style={{
          height: '350px',
        }}
        >
          {modelData == null ? (
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

CorrelationGraph.propTypes = {
  modelData: CustomPropTypes.modelData,
};

CorrelationGraph.defaultProps = {
  modelData: null,
};

export default CorrelationGraph;
