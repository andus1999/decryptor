import React from 'react'
import {FaTiktok, FaInstagram, FaYoutube} from 'react-icons/fa'
import { animateScroll as scroll } from 'react-scroll'
import { 
    FooterContainer,
    FooterWrap,
    /*FooterLinksContainer,
    FoooterLinksWrapper,
    FooterLinkTitle,
    FooterLinkItems,
    FooterLink,*/ 
    SocialMedia,
    SocialMediaWrap,
    SocialLogo,
    WebsiteRights,
    SocialIcons,
    SocialIconLink
 } from './FooterElements'

const Footer = () => {

    const toggleHome = () => {
        scroll.scrollToTop();
    };

    return (
        /*
                (<FooterWrap>)
                    <FooterLinksContainer>
                      <FoooterLinksWrapper>
                          <FooterLinkItems>
                                <FooterLinkTitle>Additional Links</FooterLinkTitle>
                                <FooterLink to="/request-coin">Request new Coin</FooterLink>
                                <FooterLink to="/about">About us</FooterLink>
                          </FooterLinkItems>
                      </FoooterLinksWrapper>
                  </FooterLinksContainer>                 
         */
        <>
          <FooterContainer>
              <FooterWrap>
                  <SocialMedia>
                      <SocialMediaWrap>
                          <SocialLogo to='/' onClick={toggleHome}>
                              decryptor
                          </SocialLogo>
                          <WebsiteRights>decryptor © {new Date().getFullYear()} All rights reserved.</WebsiteRights>
                          <SocialIcons>
                              <SocialIconLink href="/" target="_blank" aria-label="TikTok">
                                  <FaTiktok />
                              </SocialIconLink>
                              <SocialIconLink href="/" target="_blank" aria-label="Instagram">
                                  <FaInstagram />
                              </SocialIconLink>
                              <SocialIconLink href="/" target="_blank" aria-label="Youtube">
                                  <FaYoutube />
                              </SocialIconLink>
                          </SocialIcons>
                      </SocialMediaWrap>
                  </SocialMedia>
              </FooterWrap>
              </FooterContainer>  
        </>
    )
}

export default Footer
