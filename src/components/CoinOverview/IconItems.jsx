import React from 'react';
import { BiLineChartDown, BiLineChart } from 'react-icons/bi';
import { MdOutlineWaterfallChart } from 'react-icons/md';
import { FiTarget } from 'react-icons/fi';
import Colors from '../../styles/Colors';
import { Card, CardContainer } from '../CardElements';
import CustomPropTypes from '../../types/CustomPropTypes';

const IconItems = function iconItemsBanner({ prediction }) {
  const formatNumber = (number) => Math.round(number * 10000) / 100;

  const container = {
    marginTop: '10px',
    display: 'inline-block',
  };

  const icon = {
    display: 'inline-block',
    marginRight: '10px',
    fontSize: '2rem',
    marginBottom: '10px',
    color: Colors.black,
  };

  const hint = {
    color: Colors.grey,
    fontWeight: 400,
    fontSize: '0.9rem',
    marginRight: '20px',
    padding: '10px',
    paddingBottom: '0px',
  };

  const text = {
    fontSize: '1.2rem',
    display: 'inline-block',
  };

  const value = {
    padding: '10px',
  };

  return (
    <CardContainer>
      <Card variant="outlined">
        <h2 style={{
          paddingBottom: '20px',
        }}
        >
          Summary
        </h2>
        <div style={{
          paddingBottom: '20px',
          color: Colors.grey,
          fontWeight: 400,
        }}
        >
          Prediction data
        </div>
        <div style={{ minHeight: '350px' }}>
          <div style={container}>
            <BiLineChartDown style={icon} />
            <div style={text}>
              <h2 style={hint}>Lowest Prediction</h2>
              <p style={value}>{`${formatNumber(prediction.prediction.low)} %`}</p>
            </div>
          </div>
          <div style={container}>
            <FiTarget style={icon} />
            <div style={text}>
              <h2 style={hint}>Prediction Target</h2>
              <p style={value}>{`${formatNumber(prediction.prediction.average)} %`}</p>
            </div>
          </div>
          <div style={container}>
            <BiLineChart style={icon} />
            <div style={text}>
              <h2 style={hint}>Highest Prediction</h2>
              <p style={value}>{`${formatNumber(prediction.prediction.high)} %`}</p>
            </div>
          </div>
          <div style={container}>
            <MdOutlineWaterfallChart style={icon} />
            <div style={text}>
              <h2 style={hint}>Volatility Score</h2>
              <p style={value}>{`${Math.round(prediction.prediction.volatility * 100)} Points`}</p>
            </div>
          </div>
        </div>
      </Card>
    </CardContainer>
  );
};

IconItems.propTypes = {
  prediction: CustomPropTypes.prediction.isRequired,
};

export default IconItems;
