import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { getAnalytics, logEvent } from 'firebase/analytics';
import Collapse from '@mui/material/Collapse';
import Colors from '../../styles/Colors';
import { Card, CardContainer } from '../CardElements';
import CustomPropTypes from '../../types/CustomPropTypes';

const Endpoint = function endpointCard({ data, user }) {
  const [variables, setVariables] = React.useState({});
  const [response, setResponse] = React.useState(null);
  const [hideResponse, setHideResponse] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const analytics = getAnalytics();

  const url = 'decryptor.xyz/api/v1';

  const getApiUrl = () => {
    let apiUrl = url;
    data.endpoint.forEach((it) => {
      apiUrl += '/';
      if (it.startsWith(':')) {
        apiUrl += variables[it];
      } else {
        apiUrl += it;
      }
    });
    return apiUrl;
  };

  const onChange = (id) => (event) => {
    variables[id] = event.target.value;
    setVariables(variables);
  };

  const onClick = async (e) => {
    e.preventDefault();
    if (hideResponse === false) {
      setHideResponse(true);
      return;
    }

    logEvent(analytics, 'endpoint_request', user);
    setResponse(null);
    setLoading(true);
    const apiUrl = getApiUrl();
    const params = {
      headers: {
        key: user.uid,
      },
    };
    fetch(apiUrl, params)
      .then((res) => res.json())
      .then((obj) => {
        setHideResponse(false);
        const string = JSON.stringify(obj, null, '\t');
        setResponse(string);
        setLoading(false);
      })
      .catch(() => {
        setHideResponse(false);
        setResponse('Sorry, an error occured.');
        setLoading(false);
      });
  };

  const container = {
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: '10px',
  };

  const text = {
    fontSize: '1.2rem',
  };

  const endpoint = [];
  data.endpoint.forEach((item, index) => {
    if (index === 0) {
      endpoint.push(
        <div style={container} key="link">
          <p style={{ color: Colors.grey }}>{url}</p>
        </div>,
      );
    }
    endpoint.push(
      <div style={container} key={`slash ${item}`}>
        <h3 style={text}>/</h3>
      </div>,
    );
    if (item.startsWith(':')) {
      endpoint.push(
        <div style={container} key={item}>
          <TextField
            size="small"
            onChange={onChange(item)}
            autoComplete="off"
            id="outlined-basic"
            label={item.slice(1)}
            variant="outlined"
            InputProps={{ style: { fontFamily: 'Sora', fontSize: '15px' } }}
            InputLabelProps={{ style: { fontFamily: 'Sora', fontSize: '15px' } }}
          />
        </div>,
      );
    } else {
      endpoint.push(
        <div style={container} key={item}>
          <h3 style={text}>{item}</h3>
        </div>,
      );
    }
  });
  return (
    <CardContainer style={{
      maxWidth: '550px',
      textAlign: 'center',
    }}
    >
      <Card variant="outlined">
        <h1 style={{ padding: '10px' }}>{data.title}</h1>
        <p style={{
          color: Colors.primary,
          padding: '10px',
          lineHeight: '30px',
        }}
        >
          {data.action}
        </p>
        <form onSubmit={onClick}>
          <div>{endpoint}</div>
          {user && (
          <div style={{
            padding: '30px',
            textAlign: 'center',
          }}
          >
            {loading ? (
              <CircularProgress />
            ) : (
              <div style={{ margin: '2.5px' }}>
                <Button
                  style={{
                    display: 'inline-block',
                  }}
                  type="submit"
                  variant="contained"
                >
                  {hideResponse ? 'Call' : 'Clear'}
                </Button>
              </div>
            )}
          </div>
          )}
        </form>
        <Collapse in={!hideResponse}>
          <h2 style={{
            textAlign: 'center',
            padding: '20px',
          }}
          >
            Response
          </h2>
          <div style={{
            overflowY: 'auto',
            overflowX: 'hidden',
            wordBreak: 'break-all',
            whiteSpace: 'pre-wrap',
            height: '200px',
            padding: '10px',
            textAlign: 'left',
          }}
          >
            {response}
          </div>
        </Collapse>
      </Card>
    </CardContainer>
  );
};

Endpoint.propTypes = {
  user: CustomPropTypes.user,
  data: CustomPropTypes.endpointData.isRequired,
};

Endpoint.defaultProps = {
  user: null,
};

export default Endpoint;
