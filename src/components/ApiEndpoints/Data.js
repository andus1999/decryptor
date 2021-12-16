export default [
  {
    title: 'Coins',
    action: 'Get a list of all available assets.',
    endpoint: ['coins'],
  },
  {
    title: 'Coin data',
    action: 'Get data about an asset. Use a coin id to specify the asset.',
    endpoint: ['coins', ':coin id'],
  },
  {
    title: 'Models',
    action: 'Get a list of all available models.',
    endpoint: ['models'],
  },
  {
    title: 'Model data',
    action: 'Get data about a model. Use a model id to specify the model.',
    endpoint: ['models', ':model id'],
  },
  {
    title: 'Prediction',
    action: 'Get a price prediction of a coin. Use a coin id to specify the asset.',
    endpoint: ['predictions', ':coin id'],
  },
  {
    title: 'Customized drediction',
    action: 'Get a price prediction of a coin using any prediction model. Use a model id and a coin id to specify the prediction.',
    endpoint: ['predictions', ':model id', ':coin id'],
  },
  {
    title: 'Historical data',
    action: 'Get historical price data of coins. This endpoint returns a table with the following columns (in order): Open, High, Low, Close, Volume, Market cap, Timestamp. Use a coin id to specify the asset.',
    endpoint: ['historical-data', ':coin id'],
  },
];
