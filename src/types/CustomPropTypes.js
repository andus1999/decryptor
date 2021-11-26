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

const historicalData = PropTypes.arrayOf(marketData);

const { number } = PropTypes;

const prediction = PropTypes.shape({
  id: PropTypes.string.isRequired,
  market_data: marketData,
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
  title: PropTypes.string,
  action: PropTypes.string,
  endpoint: PropTypes.arrayOf(PropTypes.string),
});

const coinMetaData = PropTypes.shape({
  coin_id: PropTypes.string,
  description: PropTypes.string,
  histrical_data: historicalData,
  logo: PropTypes.string,
  name: PropTypes.string,
  source_code: PropTypes.string,
  technical_doc: PropTypes.string,
  ticker: PropTypes.string,
  timestamp: PropTypes.number,
  website: PropTypes.string,
});

const correlationDataPoint = PropTypes.shape({
  max_val_correlation: PropTypes.number,
  test_correlation: PropTypes.number,
  timestamp: PropTypes.number,
});

const modelData = PropTypes.shape({
  correlation_data: PropTypes.arrayOf(correlationDataPoint),
  description: PropTypes.string,
  model_id: PropTypes.string,
  model_name: PropTypes.string,
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

const PropertyTypes = {
  prediction,
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
};

export default PropertyTypes;
