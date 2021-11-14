import React from 'react'
import CorrelationGraph from './CorrelationGraph'
import { Colors } from '../../styles/Colors'

export default function Correlation(props) {
    function roundNumber(number){
        return Number.parseFloat(number).toPrecision(3)
    }
    return (
        <div id='correlation' style={{background: Colors.white, color: Colors.black}}>
            <div style={{maxWidth: '1100px', textAlign: 'center', margin: '0 auto 0 auto', padding: '100px 0 100px'}}>
                <div style={{
                    padding: '40px', 
                    maxWidth: '550px', 
                    display: 'inline-block',
                    textAlign: 'left'}}>
                    <h2 style={{marginBottom: '20px'}}>Correlation Data</h2>
                    {props.modelData && <p style={{
                        fontSize: '18px',
                        lineHeight: '24px',
                    }}>This graph shows pearson correlation between predictions and the true values of the test set. 
                        A value of 1 corresponds to exact correlation, a value of 0 means no correlation at all and a value of -1 means perfect negative correlation.
                        The current test set correlation is {roundNumber(props.modelData.at(-1).correlation)}. 
                        The best correlation ever achieved on the validation set was {roundNumber(props.modelData.at(-1).valCorrelation)}.</p>}
                </div>
                <CorrelationGraph modelData = {props.modelData}/>
            </div>
        </div>
    )
}
