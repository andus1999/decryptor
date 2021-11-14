import React from 'react'
import { NavbarContainer, NavLogo, Nav, NavBtn, NavBtnLink } from '../Navbar/NavbarElements'
import { getAuth, signOut } from "firebase/auth";

const LogoBanner = (props) => {
    return (
        <>
            <Nav scrollNav={true}>
                <NavbarContainer>
                    <NavLogo to='/'>decryptor</NavLogo>
                    <NavBtn>
                            {props.user ? (
                                <NavBtnLink to='' onClick={(event)=>{
                                    event.preventDefault();
                                    const auth = getAuth();
                                    signOut(auth)
                                }}>Sign Out</NavBtnLink>
                            ):(
                                <NavBtnLink to='/sign-in'>Sign In</NavBtnLink>
                            )}
                    </NavBtn>
                </NavbarContainer>
            </Nav>
            <div style={{marginTop: '80px'}}/>
        </>
    )
}

export default LogoBanner
