import PropTypes from 'prop-types';

const marketData = PropTypes.shape({
  open: PropTypes.number.isRequired,
  high: PropTypes.number.isRequired,
  low: PropTypes.number.isRequired,
  close: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
  market_cap: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
});

const headlineData = PropTypes.shape({
  headline: PropTypes.string.isRequired,
  sentiment_score: PropTypes.number.isRequired,
  sentiment_value: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
});

const sentiment = PropTypes.shape({
  sentiment_score: PropTypes.number,
  sentiment_value: PropTypes.string,
});

const historicalData = PropTypes.arrayOf(marketData);

const { number } = PropTypes;

const predictionData = PropTypes.shape({
  coin_id: PropTypes.string.isRequired,
  market_data: marketData.isRequired,
  name: PropTypes.string.isRequired,
  prediction: PropTypes.shape({
    average: PropTypes.number.isRequired,
    high: PropTypes.number.isRequired,
    low: PropTypes.number.isRequired,
    volatility: PropTypes.number.isRequired,
    model_id: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
  }),
  ticker: PropTypes.string.isRequired,
  sentiment: sentiment.isRequired,
});

const predictions = PropTypes.objectOf(prediction);

const user = PropTypes.shape({
  email: PropTypes.string.isRequired,
  freeApiCalls: PropTypes.number.isRequired,
  paidApiCalls: PropTypes.number.isRequired,
  name: PropTypes.string,
  uid: PropTypes.string.isRequired,
});

const endpointData = PropTypes.shape({
  title: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  endpoint: PropTypes.arrayOf(PropTypes.string).isRequired,
});

const coinMetaData = PropTypes.shape({
  coin_id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  historical_data: historicalData.isRequired,
  logo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  source_code: PropTypes.string,
  technical_doc: PropTypes.string,
  ticker: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  website: PropTypes.string,
  sentiment: sentiment.isRequired,
  headlines: PropTypes.arrayOf(headlineData).isRequired,
});

const correlationDataPoint = PropTypes.shape({
  max_val_correlation: PropTypes.number.isRequired,
  test_correlation: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
});

const modelData = PropTypes.shape({
  correlation_data: PropTypes.arrayOf(correlationDataPoint),
  description: PropTypes.string.isRequired,
  model_id: PropTypes.string.isRequired,
  model_name: PropTypes.string.isRequired,
});

const { func } = PropTypes;

const child = PropTypes.node;

const boolean = PropTypes.bool;

const infoData = PropTypes.shape({
  button: PropTypes.bool,
  router: PropTypes.bool,
  imgStart: PropTypes.bool,
  lightBg: PropTypes.bool,
  id: PropTypes.string,
  topLine: PropTypes.string,
  headline: PropTypes.string,
  description: PropTypes.string,
  buttonLabel: PropTypes.string,
  img: PropTypes.string,
});

const { string } = PropTypes;

const topPredictions = PropTypes.arrayOf(prediction);

const PropertyTypes = {
  predictionData,
  predictions,
  user,
  endpointData,
  coinMetaData,
  marketData,
  number,
  historicalData,
  modelData,
  func,
  child,
  boolean,
  infoData,
  string,
  topPredictions,
};

export default PropertyTypes;
