import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Link, useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import {
  NavbarContainer, NavLogo, Nav, NavBtn,
} from '../Navbar/NavbarElements';
import CustomPropTypes from '../../types/CustomPropTypes';

const LogoBanner = function logoBannerSection({ user }) {
  const history = useHistory();
  return (
    <>
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
  user: CustomPropTypes.user.isRequired,
};

export default LogoBanner;
