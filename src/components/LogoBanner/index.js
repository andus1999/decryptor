import React from 'react'
import { NavbarContainer, NavLogo, Nav, NavBtn } from '../Navbar/NavbarElements'
import { getAuth, signOut } from "firebase/auth";
import {Link} from 'react-router-dom'
import Button from '@mui/material/Button'

const LogoBanner = (props) => {
    return (
        <>
            <Nav scrollNav={true}>
                <NavbarContainer>
                    <NavLogo to='/'>decryptor</NavLogo>
                    <NavBtn>
                            {props.user ? (
                                <Button 
                                variant='contained'  
                                onClick={(event)=>{
                                    event.preventDefault();
                                    const auth = getAuth();
                                    signOut(auth)
                                }}>Sign Out</Button>
                            ):(
                                <Button
                                component={Link}
                                variant='contained' 
                                to='/sign-in'>
                                    Sign In
                                </Button>
                            )}
                    </NavBtn>
                </NavbarContainer>
            </Nav>
            <div style={{marginTop: '80px'}}/>
        </>
    )
}

export default LogoBanner
