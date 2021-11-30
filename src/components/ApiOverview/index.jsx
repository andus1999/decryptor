import React from 'react';
import Divider from '@mui/material/Divider';
import ApiCalls from './ApiCalls';
import BuyCalls from './BuyCalls';
import CustomPropTypes from '../../types/CustomPropTypes';


const ApiOverview = function apiOverviewSection({ user }) {
  return (
    <div style={{
      maxWidth: '1100px',
      margin: '40px auto 0',
      textAlign: 'center',
    }}
    >
      <Divider/>
      <ApiCalls user={user} />
      {user && <BuyCalls user={user} />}
    </div>
  );
};

ApiOverview.propTypes = {
  user: CustomPropTypes.user,
};

ApiOverview.defaultProps = {
  user: null,
};

export default ApiOverview;
