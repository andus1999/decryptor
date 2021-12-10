import React from 'react';
import Colors from '../../styles/Colors';
import CustomPropTypes from '../../types/CustomPropTypes';

const PageContainer = function pageContainer({ children }) {
  return (
    <div style ={{
      background: Colors.white,
      color: Colors.black,
      overflowX: 'hidden',
    }}
    >
      {children}
    </div>
  )
}

PageContainer.propTypes = {
  children: CustomPropTypes.child.isRequired,
}


export default PageContainer
