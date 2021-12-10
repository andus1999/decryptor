import prediction from '../../media/prediction';
import model from '../../media/model';
import server from '../../media/server';
import analytics from '../../media/analytics';
import bitcoin from '../../media/bitcoin';
// import serverDown from '../../media/serverDown.svg'

export const homeObjOne = {
  button: true,
  router: true,
  id: 'about',
  directions: '/predictions',
  lightBg: true,
  topLine: 'About',
  headline: 'Crptocurrency Evaluation',
  description: 'Decryptor uses machine learning to predict price movements of crypto-assets. You can access all predictions for free. Click the button below to see current price predictions.',
  buttonLabel: 'Show Predictions',
  imgStart: false,
  img: bitcoin,
  designAccent: true,
};

export const homeObjTwo = {
  button: true,
  router: true,
  id: 'model',
  directions: '/model',
  lightBg: false,
  topLine: 'State of the Art Prediction Model',
  headline: 'Monte Carlo Model',
  description: 'Predictions are computed by a regression neural network wich has been trained on historical price data of many crypto currencies. Click the button below for more details about the model.',
  buttonLabel: 'Learn More',
  imgStart: true,
  img: model,
  designAccent: true,
};

export const homeObjThree = {
  button: true,
  router: true,
  id: 'api',
  directions: '/api',
  lightBg: true,
  topLine: 'Powerful API',
  headline: 'API Access',
  description: 'Create powerful analytics tools and trading bots using predictions from decryptor. Get access to even more prediction data and coins. Sign up and get your API-key.',
  buttonLabel: 'Get Started',
  imgStart: true,
  img: server,
  designAccent: true,
};

export const predictionDescription = {
  button: true,
  router: false,
  id: 'predictionsAbout',
  directions: 'predictions',
  lightBg: false,
  topLine: 'Predictions',
  headline: 'Predictions and Analytics',
  description: 'Get the latest price predictions. All predictions are evaluated carefully before being released to the puplic. Every prediction additionally includes a low and high prediction. Price movements are very likely within these bounds. The volatility score can be used to evaluate pontential risks. A higher score means greater predicted volatility.',
  buttonLabel: 'Show Predictions',
  imgStart: false,
  img: prediction,
  designAccentBottom: true,
};

export const modelDescription = {
  button: true,
  router: false,
  id: 'modelDescription',
  directions: 'correlation',
  lightBg: false,
  topLine: 'Predictive Model',
  headline: 'Long Short-Term Memory Neural Net',
  description: 'To get predictions, decryptor uses a long short-term memory neural network. The model additionally implements a tequnique called monte carlo dropout for volatility estimation. The volatility score of a coin is derived from the distribution of the models outputs. Click the button below to see the models performance on the test set.',
  buttonLabel: 'Show Correlation',
  imgStart: true,
  img: model,
  designAccentBottom: true,
};

export const dataDescription = {
  button: false,
  router: false,
  id: 'dataDescription',
  directions: '',
  lightBg: false,
  topLine: 'Data',
  headline: 'High Quality Historical Data',
  description: 'The predictive model is trained on historical data of crypto currencies. This data not only includes candle price data, but also additional data like trading volume and market capitalization. Also, coin specific meta data is provided to the model in order to get more accurate predictions.',
  buttonLabel: 'Show Predictions',
  imgStart: false,
  img: analytics,
  designAccent: true,
};

export const apiDescription = {
  button: true,
  router: false,
  id: 'apiDescription',
  directions: 'endpoints',
  lightBg: false,
  topLine: 'API Access',
  headline: 'More Data',
  description: 'Get access to all predictions. The API allows you to view data from all prediction models. Also, you can retrieve historical data and more from all available coins. View and manage your API calls with a simple ui. You can see a list of all available endpoints below. Sign in to test API endpoints.',
  buttonLabel: 'See Endpoints',
  imgStart: false,
  img: server,
  designAccentBottom: true,
};
