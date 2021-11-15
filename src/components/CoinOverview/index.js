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

export default function CoinOverview(props) {
    const currency = props.prediction.currency;
    const predictionDate = new Date(props.prediction.timestampTarget*1000)
    const currentDate = new Date(props.prediction.date*1000)
    const predictionPrice = Math.round(props.prediction.priceTarget*100)/100
    const currentPrice = Math.round(props.prediction.currentPrice*100)/100
    const hint = {
        color: Colors.grey,
        margin: '20px 0 20px 0',
        fontSize: '0.9rem',
    }
    
    const whiteLine = {
        background: Colors.white, 
        display: 'inline-block', 
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
            <div style={{padding: '3%', display: 'inline-block', minWidth: '300px', textAlign: 'left'}}>
                <div style={{background: Colors.primary, display: 'inline-block', height: '70px', width: '10px', borderRadius: '2.5px'}}/>
                    <div style={{display: 'inline-block', marginLeft: '20px'}}>    
                        <h1 style={{color: Colors.white}}>{currency}</h1>
                        <p style={{
                            color: Colors.grey,
                            margin: '20px 0 20px 0',
                        }}>Detailed information about {currency}.</p>
                    </div>
                </div>
                <div style={{display: 'inline-block', minWidth: '300px', padding: '0 5% 20px 3%', textAlign: 'left'}}>
                    <div style={whiteLine}/>
                    <div style={{display: 'inline-block', marginLeft: '20px'}}>
                        <p style={hint}>Current price as per {currentDate.toLocaleDateString()}.</p>
                        <FaCoins style={{fontSize: '1.5rem', color: Colors.white, display: 'inline-block'}}/>
                        <h2 style={{color: Colors.white, display: 'inline-block', marginLeft:'30px'}}>{currentPrice + ' $'}</h2>
                    </div>
                </div>
                <div style={{display: 'inline-block', minWidth: '300px', padding: '0 5% 40px 3%',  textAlign: 'left'}}>
                    <div style={whiteLine}/>
                    <div style={{display: 'inline-block', marginLeft: '20px'}}>
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
                <img style={{
                    width: '100%',
                    maxWidth: '340px',
                    display: 'inline-block',
                    padding:'20px',
                }}src={Data} alt=""></img>
                <Volatility prediction={props.prediction}/>
                <Boxplot prediction={props.prediction}/>
                <ChartView prediction={props.prediction} historicalData={props.historicalData}/>
                <Volume historicalData={props.historicalData}/>
                <MarketCap historicalData={props.historicalData} bitcoinMarketCap = {props.bitcoinMarketCap}/>
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
