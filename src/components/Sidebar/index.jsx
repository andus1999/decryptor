import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import CustomPropTypes from '../../types/CustomPropTypes';
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SideBtnWrap,
} from './SidebarElements';

const Sidebar = function sideBarElement({ isOpen, toggle, user }) {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink onClick={toggle} to="topPredictions" offset={-80}>Top Predictions</SidebarLink>
          <SidebarLink onClick={toggle} to="about" offset={-80}>About</SidebarLink>
          <SidebarLink onClick={toggle} to="model" offset={-80}>Model</SidebarLink>
          <SidebarLink onClick={toggle} to="api" offset={-80}>API</SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          {user ? (
            <Button
              to=""
              onClick={(event) => {
                event.preventDefault();
                const auth = getAuth();
                signOut(auth);
              }}
              variant="contained"
            >
              Sign Out
            </Button>
          ) : (
            <Button
              to="/sign-in"
              variant="contained"
              component={Link}
            >
              Sign In
            </Button>
          )}
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

Sidebar.propTypes = {
  isOpen: CustomPropTypes.boolean.isRequired,
  toggle: CustomPropTypes.func.isRequired,
  user: CustomPropTypes.user,
};

Sidebar.defaultProps = {
  user: null,
};

export default Sidebar;
