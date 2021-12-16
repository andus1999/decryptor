import React from 'react';
// import {
//   FaTiktok, FaInstagram, FaYoutube, FaGalacticSenate,
// } from 'react-icons/fa';
import { animateScroll as scroll } from 'react-scroll';
import FooterButton from './FooterButton';
import RequestCoinDialog from './RequestCoinDialog';
import ReportIssueDialog from './ReportIssueDialog';
import SupportDialog from './SupportDialog';
import Colors from '../../styles/Colors';
import CustomPropTypes from '../../types/CustomPropTypes';
import { Snackbar } from '@mui/material';
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

const Footer = function footerElement({user}) {
  const [openIssue, setOpenIssue] = React.useState(false);
  const [openCoin, setOpenCoin] = React.useState(false);
  const [openSupport, setOpenSupport] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const closeReportIssue = (success) => {
    setOpenIssue(false);
    if (success == true) {
      setSnackbar(true)
      setSnackbarText('Thanks for your feedback!')
    }
  };

  const closeRequestCoin = (success) => {
    setOpenCoin(false);
    if (success == true) {
      setSnackbar(true)
      setSnackbarText('Thanks for the request. We will review it as soon as possible.')
    }
  };

  const closeSupport = (success) => {
    setOpenSupport(false);
    if (success == true){
      setSnackbar(true)
      setSnackbarText('Thanks for your question. Our support team will answer it as soon as possible!');
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={6000}
        open={snackbar}
        onClose={() => setSnackbar(false)}
        message={snackbarText}
      />

      <RequestCoinDialog
        open={openCoin}
        onClose={closeRequestCoin}
      />

      <ReportIssueDialog
        open={openIssue}
        onClose={closeReportIssue}
      />

      <SupportDialog
        open={openSupport}
        onClose={closeSupport}
        user={user}
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

                <FooterButton onClick={() => setOpenSupport(true)}>
                  Ask a question
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

Footer.propTypes = {
  user: CustomPropTypes.user,
};

export default Footer;
