import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getAnalytics, logEvent } from 'firebase/analytics';
import Colors from '../../styles/Colors';
import { CardContainer, Card } from '../CardElements';
import CustomPropTypes from '../../types/CustomPropTypes';

const BuyCalls = function buyCallsCard({ user }) {
  const history = useHistory();
  const [amount, setAmount] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [currency, setCurrency] = React.useState('eur');
  const analytics = getAnalytics();
  const minAmount = 100;

  async function createIntent() {
    const purchaseData = { value: amount, currency, uid: user.uid };
    logEvent(analytics, 'begin_checkout', purchaseData);
    setLoading(true);
    const url = (window.location.hostname === 'localhost') ? (
      'https://decryptor.xyz/stripe/intent/test'
    ) : (
      'https://decryptor.xyz/stripe/intent/live'
    );
    const params = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, currency, uid: user.uid }),
    };
    const data = await fetch(url, params);
    const intent = await data.json();
    setLoading(false);
    return intent;
  }

  async function onClick(event) {
    event.preventDefault();
    if (amount >= minAmount) {
      const intent = await createIntent();
      history.push(
        '/pay',
        { intent },
      );
    }
  }

  const onChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value <= 0 || Number.isNaN(value)) {
      setAmount('');
    } else {
      setAmount(value);
    }
  };

  const onCurrencyChange = (event) => {
    const cur = event.target.value;
    setCurrency(cur);
  };

  const getCurrencySymbol = () => {
    if (currency === 'eur') {
      return '€';
    }
    if (currency === 'usd') {
      return '$';
    }

    return '';
  };
  return (
    <CardContainer>
      <Card variant="outlined" style={{ textAlign: 'center' }}>
        <h1 style={{
          margin: '20px',
        }}
        >
          Buy API Calls
        </h1>
        <p style={{
          color: Colors.primary,
          margin: '30px',
        }}
        >
          Minimum amount is
          {' '}
          {minAmount}
          .
        </p>
        <form onSubmit={onClick}>
          <div style={{
            margin: '20px auto',
            display: 'table',
          }}
          >
            <TextField
              onChange={onChange}
              value={amount}
              autoComplete="off"
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              inputProps={{ style: { fontFamily: 'Sora' } }}
              InputLabelProps={{ style: { fontFamily: 'Sora' } }}
            />
          </div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Currency</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={currency}
              label="Currency"
              onChange={onCurrencyChange}
            >
              <MenuItem value="eur">€</MenuItem>
              <MenuItem value="usd">$</MenuItem>
            </Select>
          </FormControl>
          <h3 style={{
            margin: '20px',
          }}
          >
            Price:
            {' '}
            {(amount * 0.01).toFixed(2)}
            {' '}
            {getCurrencySymbol()}
          </h3>
          <div style={{
            margin: '30px auto',
            display: 'table',
          }}
          >
            {loading
              ? <CircularProgress />
              : (
                <div style={{ margin: '2.5px' }}>
                  <Button
                    type="submit"
                    disabled={amount < minAmount}
                    variant="contained"
                  >
                    Buy Now
                  </Button>
                </div>
              )}
          </div>
        </form>
      </Card>
    </CardContainer>
  );
};

BuyCalls.propTypes = {
  user: CustomPropTypes.user.isRequired,
};

export default BuyCalls;
