import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { getAuth, signOut } from 'firebase/auth';
import { Link, useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import {
  NavbarContainer, NavLogo, Nav, NavBtn,
} from '../Navbar/NavbarElements';
import CustomPropTypes from '../../types/CustomPropTypes';

const LogoBanner = function logoBannerSection({ user }) {
  const [showSnackbar, setShowsnackbar] = React.useState(false);
  const history = useHistory();
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={6000}
        open={showSnackbar}
        onClose={() => setShowsnackbar(false)}
        message="Successfully signed out."
      />
      <Nav scrollNav>
        <NavbarContainer>
          <div style={{
            display: 'flex',
          }}
          >
            <NavBtn>
              <Button
                color="white"
                onClick={() => history.goBack()}
              >
                <MdKeyboardArrowLeft style={{
                  fontSize: '30px',
                }}
                />
              </Button>
            </NavBtn>
            <NavLogo to="/">
              decryptor
            </NavLogo>
          </div>
          <NavBtn>
            {user ? (
              <Button
                variant="contained"
                onClick={(event) => {
                  event.preventDefault();
                  const auth = getAuth();
                  signOut(auth);
                  setShowsnackbar(true);
                }}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                component={Link}
                variant="contained"
                to="/sign-in"
              >
                Sign In
              </Button>
            )}
          </NavBtn>
        </NavbarContainer>
      </Nav>
      <div style={{ marginTop: '80px' }} />
    </>
  );
};

LogoBanner.propTypes = {
  user: CustomPropTypes.user,
};

LogoBanner.defaultProps = {
  user: null,
};

export default LogoBanner;
