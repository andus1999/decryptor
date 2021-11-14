export const data = [
    {
        title: 'Coins',
        action: 'Get a list of all available coin ids.',
        endpoint: ['coins'],
    },
    {
        title: 'Coin Data',
        action: 'Get data about a coin.',
        endpoint: ['coins', ':coin id'],
    },
    {
        title: 'Models',
        action: 'Get a list of all available model ids.',
        endpoint: ['models'],
    },
    {
        title: 'Model Data',
        action: 'Get data about a model.',
        endpoint: ['models', ':model id'],
    },
    {
        title: 'Prediction',
        action: 'Get a price prediction of a coin.',
        endpoint: ['predictions', ':coin id'],
    },
    {
        title: 'Customized Prediction',
        action: 'Get a price prediction of a coin using any prediction model.',
        endpoint: ['predictions', ':model id', ':coin id'],
    },
    {
        title: 'Historical Data',
        action: 'Get historical price data of coins. This endpoint returns a table with following columns (in order): Open, High, Low, Close, Volume, Market cap, Timestamp.',
        endpoint: ['historical-data', ':coin id'],
    },
]