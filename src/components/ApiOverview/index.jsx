import React from 'react';
import ApiCalls from './ApiCalls';
import BuyCalls from './BuyCalls';
import CustomPropTypes from '../../types/CustomPropTypes';

const ApiOverview = function apiOverviewSection({ user }) {
  return (
    <div style={{
      maxWidth: '1100px',
      margin: '0 auto',
      textAlign: 'center',
    }}
    >
      <ApiCalls user={user} />
      {user && <BuyCalls user={user} />}
    </div>
  );
};

ApiOverview.propTypes = {
  user: CustomPropTypes.user.isRequired,
};

export default ApiOverview;
