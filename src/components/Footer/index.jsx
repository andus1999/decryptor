import React from 'react';
// import {
//   FaTiktok, FaInstagram, FaYoutube, FaGalacticSenate,
// } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';
import FooterButton from './FooterButton';
import RequestCoinDialog from './RequestCoinDialog';
import ReportIssueDialog from './ReportIssueDialog';
import Colors from '../../styles/Colors';
import {
  FooterContainer,
  FooterWrap,
  FooterLinksContainer,
  FoooterLinksWrapper,
  FooterLinkTitle,
  FooterLinkItems,
  // FooterLink,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  WebsiteRights,
  // SocialIcons,
  // SocialIconLink,
} from './FooterElements';

const Footer = function footerElement() {
  const [openIssue, setOpenIssue] = React.useState(false);
  const [openCoin, setOpenCoin] = React.useState(false);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const closeReportIssue = () => {
    setOpenIssue(false);
  };

  const closeRequestCoin = () => {
    setOpenCoin(false);
  };

  return (
    <>
      <RequestCoinDialog
        open={openCoin}
        onClose={closeRequestCoin}
      />
      <ReportIssueDialog
        open={openIssue}
        onClose={closeReportIssue}
      />

      <FooterContainer>
        <div style={{
          left: '-5%',
          background: Colors.primary,
          height: '5px',
          width: '110%',
        }} 
        />
        <FooterWrap>
          <FooterLinksContainer>
            <FoooterLinksWrapper>
              <FooterLinkItems>
                <FooterLinkTitle>Additional Actions</FooterLinkTitle>
                <FooterButton onClick={() => setOpenCoin(true)}>
                  Request a Coin
                </FooterButton>

                <FooterButton onClick={() => setOpenIssue(true)}>
                  Report an Issue
                </FooterButton>
              </FooterLinkItems>
            </FoooterLinksWrapper>
          </FooterLinksContainer>
          <SocialMedia>
            <SocialMediaWrap>
              <SocialLogo to="/" onClick={toggleHome}>
                decryptor
              </SocialLogo>
              <WebsiteRights>
                decryptor ©
                {new Date().getFullYear()}
                {' '}
                All rights reserved.
              </WebsiteRights>
              {/* <SocialIcons>
                    <SocialIconLink href="/" target="_blank" aria-label="TikTok">
                        <FaTiktok />
                    </SocialIconLink>
                    <SocialIconLink href="/" target="_blank" aria-label="Instagram">
                        <FaInstagram />
                    </SocialIconLink>
                    <SocialIconLink href="/" target="_blank" aria-label="Youtube">
                        <FaYoutube />
                    </SocialIconLink>
                </SocialIcons> */}
            </SocialMediaWrap>
          </SocialMedia>
        </FooterWrap>
      </FooterContainer>
    </>
  );
};

export default Footer;
