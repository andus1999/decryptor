import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { FaBars } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';
import { getAuth, signOut } from 'firebase/auth';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import CustomPropTypes from '../../types/CustomPropTypes';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
} from './NavbarElements';

const Navbar = function navBarComponent({ toggle, user }) {
  const [scrollNav, setScrollNav] = useState(false);
  const [showSnackbar, setShowsnackbar] = useState(false);
  const [width, setWidth] = React.useState(null);

  const resize = () => {
    setWidth(document.getElementById('root').offsetWidth);
  };
  window.onresize = resize;
  React.useEffect(resize, [])

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
    return function cleanup() {
      window.removeEventListener('scroll', changeNav);
    };
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={6000}
        open={showSnackbar}
        onClose={() => setShowsnackbar(false)}
        message="Successfully signed out."
      />
      <Nav scrollNav={scrollNav} style={{width}}>
        <NavbarContainer>
          <NavLogo to="/" onClick={toggleHome}>
            decryptor
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
          <NavItem>
              <NavLinks
                to="topPredictions"
                smooth="true"
                duration={500}
                spy
                exact="true"
                offset={-80}
              >
                Top Predictions
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="about"
                smooth="true"
                duration={500}
                spy
                exact="true"
                offset={-80}
              >
                About
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="model"
                smooth="true"
                duration={500}
                spy
                exact="true"
                offset={-80}
              >
                Model
              </NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks
                to="api"
                smooth="true"
                duration={500}
                spy
                exact="true"
                offset={-80}
              >
                API
              </NavLinks>
            </NavItem>
          </NavMenu>
          <NavBtn>
            {user ? (
              <Button
                onClick={(event) => {
                  event.preventDefault();
                  const auth = getAuth();
                  signOut(auth);
                  setShowsnackbar(true);
                }}
                variant="contained"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                component={RouterLink}
                to="/sign-in"
                variant="contained"
              >
                Sign In
              </Button>
            )}
          </NavBtn>
        </NavbarContainer>
      </Nav>
    </>
  );
};

Navbar.propTypes = {
  user: CustomPropTypes.user,
  toggle: CustomPropTypes.func.isRequired,
};

Navbar.defaultProps = {
  user: null,
};

export default Navbar;
