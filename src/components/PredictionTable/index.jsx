import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { ThemeProvider } from '@material-ui/styles';
import { withRouter, useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Colors from '../../styles/Colors';
import { mainTheme } from '../../styles/Themes';
import CustomPropTypes from '../../types/CustomPropTypes';

const useStyles = makeStyles(
  () => ({
    root: {
      '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
        outline: 'none',
      },
      '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus': {
        outline: 'none',
      },
      '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus-within': {
        outline: 'none',
      },
      '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
        outline: 'none',
      },
    },
  }),
  { mainTheme },
);

const height = 697;

const formatPercentage = (number) => Math.round(number * 10000) / 100;

const columns = [
  {
    field: 'ticker',
    headerName: 'Ticker',
    width: 150,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
  },
  {
    field: 'prediction',
    headerName: 'Prediction (%)',
    type: 'number',
    width: 200,
    valueGetter: (params) => (formatPercentage(params.row.prediction.average)),
  },
  {
    field: 'prediction.low',
    headerName: 'Lowest Prediction (%)',
    type: 'number',
    width: 200,
    valueGetter: (params) => (formatPercentage(params.row.prediction.low)),
  },
  {
    field: 'prediction.high',
    headerName: 'Highest Prediction (%)',
    type: 'number',
    width: 200,
    valueGetter: (params) => (formatPercentage(params.row.prediction.high)),
  },
  {
    field: 'prediction.volatility',
    headerName: 'Volatility Score',
    type: 'number',
    width: 200,
    valueGetter: (params) => (Math.round(params.row.prediction.volatility * 100)),
  },
];

const PredictionTable = function materialPredictionTable({ predictions }) {
  const [searchText, setSearchText] = React.useState('');
  const [componentsMounted, setComponentsMounted] = React.useState(false);

  const classes = useStyles();
  const history = useHistory();
  const ref = React.useRef();

  function onCoinClick(coin) {
    history.push(`/predictions/${coin}`);
  }
  const onSearch = (event) => {
    setSearchText(event.target.value);
  };

  const getRows = () => {
    if (predictions == null) {
      return [];
    }
    return (Object.keys(predictions).filter((x) => predictions[x].name.toLocaleLowerCase()
      .includes(searchText.toLocaleLowerCase())
        || predictions[x].ticker.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())))
      .map((x) => predictions[x]);
  };

  React.useEffect(() => {
    if (history.action === 'POP' && ref.current != null) {
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: y });
    }
    if (history.action === 'PUSH') {
      window.scrollTo({ top: 0 });
    }
    const timeout = setTimeout(() => {
      setComponentsMounted(true);
    }, 0);

    return () => clearTimeout(timeout);
  }, [history]);

  return (
    <div>
      <h1
        style={{
          height: '80px',
          width: '100%',
          textAlign: 'center',
          lineHeight: '80px',
        }}
        ref={ref}
        id="predictions"
      >
        Predictions
      </h1>
      <p style={{
        textAlign: 'center',
        height: '20px',
        color: Colors.primary,
      }}
      >
        Click on predictions to see more details.
      </p>
      <div style={{
        display: 'table',
        margin: '50px auto 20px auto',
      }}
      >
        <TextField
          autoComplete="off"
          id="outlined-basic"
          label="Search predictions"
          variant="outlined"
          onChange={onSearch}
          inputProps={{ style: { fontFamily: 'Sora' } }}
          InputLabelProps={{ style: { fontFamily: 'Sora' } }}
        />
      </div>
      {predictions == null || componentsMounted === false ? (
        <div style={{
          height,
        }}
        >
          <h1 style={{
            marginTop: '100px',
            textAlign: 'center',
            fontSize: '1rem',
          }}
          >
            Loading...
          </h1>
        </div>
      ) : (
        <div style={{ padding: '20px 5% 30px 5%', maxWidth: '1400px', margin: '0 auto' }}>
          <ThemeProvider theme={mainTheme}>
            <DataGrid
              className={classes.root}
              rows={getRows()}
              columns={columns}
              disableSelectionOnClick
              pageSize={10}
              autoHeight
              onCellClick={(params) => {
                onCoinClick(params.row.id);
              }}
            />
          </ThemeProvider>
        </div>
      )}
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

PredictionTable.propTypes = {
  predictions: CustomPropTypes.predictions,
};

PredictionTable.defaultProps = {
  predictions: null,
};

export default withRouter(PredictionTable);
