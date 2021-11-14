import React from 'react'
import { Card, CardContainer } from '../CardElements'
import { Colors } from '../../styles/Colors'
import {Bar, defaults} from 'react-chartjs-2'

export default function Boxplot(props) {
    defaults.font.family = 'Sora'
    defaults.font.size = 16

    const data = {
        labels: ['Low', 'High'],
        datasets: [{
          data: [[props.prediction.predictionLow, props.prediction.prediction],
                [props.prediction.prediction, props.prediction.predictionHigh]],
          backgroundColor: Colors.primary,
          borderRadius: 10,
          borderSkipped: false,
        }]
      };

    return (
        <CardContainer>
            <Card variant='outlined'>
                <h2 style={{paddingBottom: '20px'}}>Prediction Spread</h2>
                <div style={{
                paddingBottom: '20px',
                color: Colors.grey,
                fontWeight: 400,
                }}>High and low predictions</div>
                <div style={{height: '350px'}}>
                    <Bar
                    data={data}
                    options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: {
                            tooltip:{
                                titleColor: Colors.black,
                                bodyColor: Colors.black,
                                backgroundColor: Colors.white,
                            },
                            legend: {
                                display: false,
                            }
                        }
                    }}/>
                </div>
            </Card>
        </CardContainer>
    )
}
