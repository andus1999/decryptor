import React, {useState, useEffect} from 'react';
import { FaBars } from 'react-icons/fa'
import { animateScroll as scroll } from 'react-scroll'
import { getAuth, signOut } from "firebase/auth";
import {
    Nav, 
    NavbarContainer, 
    NavLogo, 
    MobileIcon, 
    NavMenu, 
    NavItem, 
    NavLinks,
    NavBtn,
    NavBtnLink
} from './NavbarElements';

const Navbar = ({ toggle, user }) => {
    const [scrollNav, setScrollNav] = useState(false)

    const changeNav = () => {
        if(window.scrollY >= 80){
            setScrollNav(true)
        } else{
            setScrollNav(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
        return function cleanup() {
            window.removeEventListener('scroll', changeNav)
        }
    }, []);

    const toggleHome = () => {
        scroll.scrollToTop();
    };

    return (
        <>
            <Nav scrollNav={scrollNav}>
                <NavbarContainer>
                    <NavLogo to='/' onClick={toggleHome}>
                        decryptor
                    </NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars />
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to='about'
                            smooth='true' duration={500} spy={true} 
                            exact='true' offset={-80}>About</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='model'
                            smooth='true' duration={500} spy={true} 
                            exact='true' offset={-80}>Model</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='topPredictions'
                            smooth='true' duration={500} spy={true} 
                            exact='true' offset={-80}>Top Predictions</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='api'
                            smooth='true' duration={500} spy={true} 
                            exact='true' offset={-80}>API</NavLinks>
                        </NavItem>
                    </NavMenu>
                    <NavBtn>
                        {user ? (
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
        </>
    );
}

export default Navbar
