import React from 'react';
import { Doughnut, defaults } from 'react-chartjs-2';
import Colors from '../../styles/Colors';
import { Card, CardContainer } from '../CardElements';
import { DoughnutChartOptions } from '../../styles/Themes';
import CustomPropTypes from '../../types/CustomPropTypes';

const MarketCap = function marketCapCard({ historicalData, bitcoinMarketCap }) {
  defaults.font.family = 'Sora';
  defaults.font.size = 16;

  const marketCap = historicalData?.at(-1).market_cap;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const data = {
    datasets: [{
      data: [marketCap, (bitcoinMarketCap - marketCap) ** 0.9],
      backgroundColor: [
        Colors.primary,
        Colors.lightGrey,
      ],
      hoverOffset: 4,
    }],
  };

  return (
    <CardContainer>
      <Card variant="outlined">
        <h2 style={{ paddingBottom: '20px' }}>Market Cap</h2>
        <div style={{
          paddingBottom: '20px',
          color: Colors.grey,
          fontWeight: 400,
        }}
        >
          Market Capitalization in USD
        </div>
        <div style={{ minHeight: '350px' }}>
          {marketCap != null ? (
            <div style={{ paddingTop: '20px' }}>
              <p style={{
                textAlign: 'center',
                height: '40px',
              }}
              >
                {`${numberWithCommas(marketCap)} $`}
              </p>
              <Doughnut
                data={data}
                options={DoughnutChartOptions}
              />
            </div>
          ) : (
            <p style={{
              textAlign: 'center',
              lineHeight: '350px',
            }}
            >
              Loading...
            </p>
          )}

        </div>
      </Card>
    </CardContainer>
  );
};

MarketCap.propTypes = {
  historicalData: CustomPropTypes.historicalData.isRequired,
  bitcoinMarketCap: CustomPropTypes.number.isRequired,
};

export default MarketCap;
