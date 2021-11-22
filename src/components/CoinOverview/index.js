import * as React from 'react'
import { Colors } from '../../styles/Colors'
import ChartView from './ChartView';
import Volume from './Volume';
import IconItems from './IconItems'
import Volatility from './Volatility';
import {FaCoins} from 'react-icons/fa'
import Boxplot from './Boxplot';
import Data from '../../media/data.svg'
import MarketCap from './MarketCap';
import Description from './Description';

const convertTimeStamp = (timestamp) => {
  return (timestamp + 3600 * 24) * 1000
}

export default function CoinOverview(props) {
    const formatNumber = (number) => {
        return (number > 0.1) ?
        Math.round(number*100)/100 :
        number.toPrecision(2)
    }
    const currency = props.prediction.currency;
    const predictionDate = new Date(props.prediction.timestampTarget*1000)
    const currentDate = new Date(props.prediction.date*1000)
    const predictionPrice = formatNumber(props.prediction.priceTarget)
    const currentPrice = formatNumber(props.prediction.currentPrice)
    const hint = {
        color: Colors.grey,
        margin: '20px 0 20px 0',
        fontSize: '0.9rem',
    }
    
    const whiteLine = {
        background: Colors.white, 
        marginTop: '20px',
        float: 'left', 
        height: '60px', 
        width: '5px', 
        borderRadius: '2.5px'
    }

    return (
        <div style = {{
            
        }}>
        <div style={{
            background: Colors.black,
            marginTop: '80px',
        }}>
            <div style={{
                maxWidth: '1100px',
                margin: '0 auto'}}>
                <div style={{padding: '3%', display: 'inline-block', textAlign: 'left'}}>
                    <div style={{
                        background: Colors.primary, 
                        float: 'left', 
                        height: '70px', 
                        width: '10px', 
                        borderRadius: '5px',
                        marginTop: '5px',}}/>
                    <div style={{marginLeft: '30px', overflow:'hidden'}}>    
                        <h1 style={{color: Colors.white}}>{currency}</h1>
                        <p style={{
                            color: Colors.grey,
                            margin: '20px 0 0 0',
                        }}>Detailed information about {currency}.</p>
                    </div>
                </div>
                <div style={{display: 'inline-block', padding: '0 2% 20px 3%', textAlign: 'left'}}>
                    <div style={whiteLine}/>
                    <div style={{overflow: 'hidden', marginLeft: '20px'}}>
                        <p style={hint}>Current price as per {currentDate.toLocaleDateString()}.</p>
                        <FaCoins style={{fontSize: '1.5rem', color: Colors.white, display: 'inline-block'}}/>
                        <h2 style={{color: Colors.white, display: 'inline-block', marginLeft:'30px'}}>{currentPrice + ' $'}</h2>
                    </div>
                </div>
                <div style={{display: 'inline-block', padding: '0 2% 40px 3%',  textAlign: 'left'}}>
                    <div style={whiteLine}/>
                    <div style={{overflow: 'hidden', marginLeft: '20px'}}>
                        <p style={hint}>Price target for {predictionDate.toLocaleDateString()}.</p>
                        <FaCoins style={{fontSize: '1.5rem', color: Colors.white, display: 'inline-block'}}/>
                        <h2 style={{color: Colors.white, display: 'inline-block', marginLeft:'30px'}}>{predictionPrice + ' $'}</h2>
                    </div>
                </div>
            </div>
        </div>
        <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
        }}>
            <div style={{
                margin:'40px 3% 40px 3%',
                textAlign: 'center'}}>
                <IconItems prediction={props.prediction}/>
                <div style={{
                    maxWidth: '340px',
                    display: 'inline-block',
                    padding: '20px',
                }}>
                    <div style={{
                        margin: '10px 0 30px',
                        height: '64px'
                    }}>
                        {props.metaData && 
                            <img style={{
                                height: '64px',
                                borderRadius: '10px',
                            }} 
                            src={props.metaData.logo} 
                            alt=""></img>
                        }
                    </div>
                    <img style={{width: '100%'}} src={Data} alt=""></img>
                </div>                
                <Volatility prediction={props.prediction}/>
                <Boxplot prediction={props.prediction}/>
                <ChartView prediction={props.prediction} historicalData={props.metaData?.historical_data}/>
                <Volume historicalData={props.metaData?.historical_data}/>
                <MarketCap historicalData={props.metaData?.historical_data} bitcoinMarketCap = {props.bitcoinMarketCap}/>
                <Description metaData={props.metaData}/>
            </div>
        </div>
        <div style={{
                color: Colors.grey,
                textAlign: 'center'
                }}>
                <p style={{
                    height: '40px',
                }}> Disclaimer:</p>
                <p style={{
                    height: '80px'
                }}>
                    Predictions are not exact and true values may vary significantly.
                </p>
            </div>
        </div>
    )
}
