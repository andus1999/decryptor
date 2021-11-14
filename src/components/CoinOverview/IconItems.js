import React from 'react'
import {BiLineChartDown, BiLineChart} from 'react-icons/bi'
import {MdOutlineWaterfallChart} from 'react-icons/md'
import {FiTarget} from 'react-icons/fi'
import {Colors} from '../../styles/Colors'
import { Card, CardContainer } from '../CardElements'

export default function IconItems(props) {

    const container = {
        marginTop: '10px',
        display: 'inline-block',
    }

    const icon = {
        display: 'inline-block',
        marginRight: '10px',
        fontSize: '2rem',
        marginBottom: '10px',
        color: Colors.black,
    }

    const hint = {
        color: Colors.grey,
        fontWeight: 400,
        fontSize: '0.9rem',
        marginRight: '20px',
        padding: '10px',
        paddingBottom: '0px',
    }

    const text ={
        fontSize: '1.2rem',
        display: 'inline-block',
    }

    const value={
        padding: '10px',
    }

    return (
        <CardContainer>
            <Card variant='outlined'>
                <h2 style={{
                paddingBottom: '20px',
                }}>Summary</h2>
                <div style={{
                paddingBottom: '20px',
                color: Colors.grey,
                fontWeight: 400,
                }}>Prediction results for {props.prediction.currency}</div>
                <div style={{height: '350px'}}>
                    <div style={container}>
                        <BiLineChartDown style={icon}/>
                        <div style={text}>
                            <h2 style={hint}>Lowest Prediction</h2>
                            <p style={value}>{props.prediction.predictionLow+' %'}</p>
                        </div>
                    </div>
                    <div style={container}>
                        <FiTarget style={icon}/>
                        <div style={text}>
                            <h2 style={hint}>Prediction Target</h2>
                            <p style={value}>{props.prediction.prediction+' %'}</p>
                        </div>
                    </div>
                    <div style={container}>
                        <BiLineChart style={icon}/>
                        <div style={text}>
                            <h2 style={hint}>Highest Prediction</h2>
                            <p style={value}>{props.prediction.predictionHigh+' %'}</p>
                        </div>
                    </div>
                    <div style={container}>
                        <MdOutlineWaterfallChart style={icon}/>
                        <div style={text}>
                            <h2 style={hint}>Volatility Score</h2>
                            <p style={value}>{props.prediction.volatility+' Points'}</p>
                        </div>
                    </div>
                </div>
            </Card>
        </CardContainer>
    )
}
