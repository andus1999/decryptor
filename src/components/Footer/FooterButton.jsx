import React from 'react';
import Button from '@mui/material/Button';
import CustomPropTypes from '../../types/CustomPropTypes';

const FooterButton = function footerMaterialButton({ onClick, children }) {
  return (
    <div style={{
      padding: '1px 0',
    }}
    >
      <Button
        sx={{
          textAlign: 'left',
          fontSize: 12,
          ':hover': {
            color: 'primary.main',
          },
        }}
        onClick={onClick}
        color="white"
      >
        {children}
      </Button>
    </div>
  );
};

FooterButton.propTypes = {
  onClick: CustomPropTypes.func.isRequired,
  children: CustomPropTypes.child.isRequired,
};

export default FooterButton;
