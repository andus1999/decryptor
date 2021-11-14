import React from 'react'
import { Colors } from '../../styles/Colors'
import {Doughnut, defaults} from 'react-chartjs-2'
import { Card, CardContainer } from '../CardElements'
import { DoughnutChartOptions } from '../../styles/Themes'

export default function Volatility(props) {
    defaults.font.family = 'Sora'
    defaults.font.size = 16

    const data = {
        datasets: [{
          data: [props.prediction.volatility, 100-props.prediction.volatility],
          backgroundColor: [
              Colors.primary,
              Colors.lightGrey
          ],
          hoverOffset: 4
        }]
      };

    return (
        <CardContainer>
            <Card variant='outlined'>
                <h2 style={{paddingBottom: '20px'}}>Volatility Score</h2>
                <div style={{
                paddingBottom: '20px',
                color: Colors.grey,
                fontWeight: 400,
                }}>Expected Volatility</div>
                <div style={{height: '350px'}}>
                    <div style={{paddingTop: '20px'}}>
                        <p style={{
                            textAlign: 'center',
                            height: '40px'}}>
                            {props.prediction.volatility + ' Points'}
                        </p>
                        <Doughnut
                        data={data}
                        options={DoughnutChartOptions}/>
                    </div>
                </div>
            </Card>
        </CardContainer>
    )
}
