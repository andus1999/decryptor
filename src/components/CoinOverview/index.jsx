import * as React from 'react';
import Divider from '@mui/material/Divider';
import { FaCoins } from 'react-icons/fa';
import Colors from '../../styles/Colors';
import ChartView from './ChartView';
import Volume from './Volume';
import IconItems from './IconItems';
import Volatility from './Volatility';
import Boxplot from './Boxplot';
import Data from '../../media/data';
import MarketCap from './MarketCap';
import Description from './Description';
import CustomPropTypes from '../../types/CustomPropTypes';
import Sentiment from './Sentiment';

const CoinOverview = function coinOverviewPage({ predictionData, metaData, bitcoinMarketCap }) {
  const formatNumber = (number) => ((number > 0.1)
    ? Math.round(number * 100) / 100
    : number.toPrecision(2));
  const currency = predictionData.name;
  const predictionDate = new Date(predictionData.prediction.timestamp * 1000).toLocaleDateString();
  const currentDate = new Date(predictionData.market_data.timestamp * 1000).toLocaleDateString();
  const current = predictionData.market_data.close;
  const currentPrice = formatNumber(current);
  const predictionPrice = formatNumber(current * (1 + predictionData.prediction.average));
  const marketDataSlice = window.innerWidth >= 600 ? 30 : 10;
  const historicalData = metaData
    ? metaData.historical_data.slice(-marketDataSlice)
    : null
  const hint = {
    color: Colors.grey,
    margin: '20px 0 20px 0',
    fontSize: '0.9rem',
  };

  const whiteLine = {
    background: Colors.white,
    marginTop: '20px',
    float: 'left',
    height: '60px',
    width: '5px',
    borderRadius: '2.5px',
  };

  return (
    <div style={{width: '100%', position: 'relative'}}>  
      <div style={{
        background: Colors.black,
      }}
      >
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
        }}
        >
          <div style={{ padding: '3%', display: 'inline-block', textAlign: 'left' }}>
            <div style={{
              background: Colors.primary,
              float: 'left',
              height: '70px',
              width: '10px',
              borderRadius: '5px',
              marginTop: '5px',
            }}
            />
            <div style={{ marginLeft: '30px', overflow: 'hidden' }}>
              <h1 style={{ color: Colors.white }}>{currency}</h1>
              <p style={{
                color: Colors.grey,
                margin: '20px 0 0 0',
              }}
              >
                Detailed information about
                {' '}
                {currency}
                .
              </p>
            </div>
          </div>
          <div style={{ display: 'inline-block', padding: '0 2% 20px 3%', textAlign: 'left' }}>
            <div style={whiteLine} />
            <div style={{ overflow: 'hidden', marginLeft: '20px' }}>
              <p style={hint}>
                {`Current price as per ${currentDate}.`}
              </p>
              <FaCoins style={{ fontSize: '1.5rem', color: Colors.white, display: 'inline-block' }} />
              <h2 style={{ color: Colors.white, display: 'inline-block', marginLeft: '30px' }}>{`${currentPrice} $`}</h2>
            </div>
          </div>
          <div style={{ display: 'inline-block', padding: '0 2% 40px 3%', textAlign: 'left' }}>
            <div style={whiteLine} />
            <div style={{ overflow: 'hidden', marginLeft: '20px' }}>
              <p style={hint}>
                {`Price target for ${predictionDate}.`}
              </p>
              <FaCoins style={{ fontSize: '1.5rem', color: Colors.white, display: 'inline-block' }} />
              <h2 style={{ color: Colors.white, display: 'inline-block', marginLeft: '30px' }}>{`${predictionPrice} $`}</h2>
            </div>
          </div>
        </div>
      </div>
      <div style={{
        left: '-5%',
        background: Colors.primary,
        height: '5px',
        width: '110%',
      }} 
      />
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
      }}
      >
        <div style={{
          margin: '40px 3% 40px 3%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
        >
          <Divider />
          <IconItems predictionData={predictionData} />
          <div style={{
            width: '100%',
            maxWidth: '340px',
            display: 'inline-block',
            padding: '20px',
          }}
          >
            <div style={{
              margin: '10px 0 30px',
              height: '64px',
            }}
            >
              {metaData
                            && (
                            <img
                              style={{
                                height: '64px',
                                borderRadius: '10px',
                              }}
                              src={metaData.logo}
                              alt=""
                            />
                            )}
            </div>
            <img style={{ width: '100%' }} src={Data} alt="" />
          </div>
          <Volatility predictionData={predictionData} />
          <Divider />
          <Boxplot predictionData={predictionData} />
          <ChartView predictionData={predictionData} historicalData={historicalData} />
          <Divider />
          <Volume historicalData={historicalData} />
          <MarketCap
            historicalData={historicalData}
            bitcoinMarketCap={bitcoinMarketCap}
          />
          <Divider />
          <Sentiment metaData={metaData} predictionData={predictionData} />
          <Description metaData={metaData} />
          <Divider />
        </div>
      </div>
      <div style={{
        color: Colors.grey,
        textAlign: 'center',
      }}
      >
        <p style={{
          height: '40px',
        }}
        >
          {' '}
          Disclaimer:
        </p>
        <p style={{
          height: '80px',
        }}
        >
          Predictions are not exact and true values may vary significantly.
        </p>
      </div>
      
    </div>
  );
};

CoinOverview.propTypes = {
  predictionData: CustomPropTypes.predictionData.isRequired,
  bitcoinMarketCap: CustomPropTypes.number.isRequired,
  metaData: CustomPropTypes.coinMetaData,
};

CoinOverview.defaultProps = {
  metaData: null,
};

export default CoinOverview;
