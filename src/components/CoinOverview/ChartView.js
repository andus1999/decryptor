import React from 'react'
import { Colors } from '../../styles/Colors';
import { Card, CardContainer } from '../CardElements'
import {Scatter, defaults} from 'react-chartjs-2'
import 'chartjs-adapter-date-fns';
import { LineChartOptions } from '../../styles/Themes';

const convertTimeStamp = (timestamp) => {
  return (timestamp + 3600 * 24) * 1000
}

export default function ChartView(props) {
    defaults.font.family = 'Sora'
    defaults.font.size = 16;
    const predictions = props.historicalData?.map((x) => {
      return {x: convertTimeStamp(x.timestamp), y: x.close}
    });
    predictions?.push({x: props.prediction.timestampTarget*1000, y: props.prediction.priceTarget})
    const lows = [
      predictions?.at(-2),
      {x: props.prediction.timestampTarget*1000, y: props.prediction.priceTargetLow},
    ]
    const highs = [
      predictions?.at(-2),
      {x: props.prediction.timestampTarget*1000, y: props.prediction.priceTargetHigh},
    ]

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
      ]
    }
    return (
      <CardContainer style={{maxWidth: '680px'}}>
        <Card variant='outlined'>
          <h2 style={{
            paddingBottom: '20px',
          }}>Prediction Chart</h2>
          <div style={{
            paddingBottom: '20px',
            color: Colors.grey,
            fontWeight: 400,
          }}>Prices in USD</div>
          {props.historicalData ? (
            <div style = {{
              height: '350px',
            }}>
              <Scatter
                data={data}
                options={LineChartOptions}
              />
            </div>
          ):(
            <p style={{
              textAlign: 'center',
              lineHeight: '350px',
            }}>Loading...</p>
          )}
        </Card>
      </CardContainer>
    )
}
