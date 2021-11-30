import React from 'react';
import Divider from '@mui/material/Divider';
import Data from './Data';
import Endpoint from './Endpoint';
import Colors from '../../styles/Colors';
import { Card, CardContainer } from '../CardElements';
import CustomPropTypes from '../../types/CustomPropTypes';

const ApiEndpoints = function apiEndpointCards({ user }) {
  const endpoints = Data.map((item) => <Endpoint key={item.title} data={item} user={user} />);
  return (
    <div
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '50px 0',
      }}
      id="endpoints"
    >
      <Divider />
      <h1 style={{
        textAlign: 'center',
        margin: '40px 0 20px',
      }}
      >
        API Endpoints
      </h1>
      <div style={{
        textAlign: 'center',
        margin: '0 auto',
        maxWidth: '1100px',
      }}
      >
        {user ? (
          <CardContainer style={{
            maxWidth: '550px',
            textAlign: 'center',
          }}
          >
            <Card variant="outlined">
              <h3 style={{ padding: '20px' }}>You need to authorize all API requests with your API key</h3>
              <p style={{ padding: '20px 20px 10px' }}>Every request must contain the following header:</p>
              <p style={{
                color: Colors.primary,
                overflowWrap: 'break-word',
                padding: '20px',
              }}
              >
                key:
                {' '}
                {user.uid}
              </p>
            </Card>
          </CardContainer>
        ) : (
          <p style={{
            textAlign: 'center',
            margin: '20px',
          }}
          >
            Sign in to test all endpoints.
          </p>
        )}
        {endpoints}
      </div>
    </div>
  );
};

ApiEndpoints.propTypes = {
  user: CustomPropTypes.user,
};

ApiEndpoints.defaultProps = {
  user: null,
};

export default ApiEndpoints;
