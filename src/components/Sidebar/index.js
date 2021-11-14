import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import {
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SideBtnWrap,
    SidebarRoute
} from './SidebarElements'

const Sidebar = ({ isOpen, toggle, user }) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink onClick={ toggle } to='about' offset={-80}>About</SidebarLink>
                    <SidebarLink onClick={ toggle } to='model' offset={-80}>Model</SidebarLink>
                    <SidebarLink onClick={ toggle } to='topPredictions' offset={-80}>Top Predictions</SidebarLink>
                    <SidebarLink onClick={ toggle } to='api' offset={-80}>API</SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    {user ? (
                        <SidebarRoute to='' onClick={(event)=>{
                            event.preventDefault();
                            const auth = getAuth();
                            signOut(auth)
                        }}>Sign Out</SidebarRoute>
                    ):(
                        <SidebarRoute to='/sign-in'>Sign In</SidebarRoute>
                    )}
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
