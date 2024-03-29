import React from 'react';
import Button from '@mui/material/Button';
import { scroller } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import CustomPropTypes from '../../types/CustomPropTypes';
import Colors from '../../styles/Colors';
import {
  InfoContainer,
  InfoWrapper,
  InfoRow,
  Column1,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  BtnWrap,
  Column2,
  ImgWrap,
  Img,
} from './InfoElements';

const InfoSection = function infoSection({ data }) {
  const {
    button, router, lightBg, id, directions,
    imgStart, topLine, headline, description, buttonLabel,
    img, designAccent, designAccentBottom,
  } = data;
  const scrollBehavior = () => {
    scroller.scrollTo(directions, {
      duration: 500,
      smooth: true,
      offset: -80,
    });
  };
  return (
    <InfoContainer lightBg={lightBg} id={id}>
      {(designAccent) &&
        <>
          <div style={{
            left: '-5%',
            background: Colors.primary,
            height: '5px',
            width: '110%',
          }} 
          />
        </>
      }
      <InfoWrapper lightBg={lightBg}>
        <InfoRow imgStart={imgStart}>
          <Column1>
            <TextWrapper>
              <TopLine>{topLine}</TopLine>
              <Heading lightText={!lightBg}>{headline}</Heading>
              <Subtitle darkText={lightBg}>{description}</Subtitle>
              {button
                                        && (
                                        <BtnWrap>
                                          {router ? (
                                            <Button
                                              variant="contained"
                                              component={RouterLink}
                                              to={directions}
                                            >
                                              {buttonLabel}
                                            </Button>
                                          ) : (
                                            <Button
                                              variant="contained"
                                              onClick={scrollBehavior}
                                            >
                                              {buttonLabel}
                                            </Button>
                                          )}
                                        </BtnWrap>
                                        )}
            </TextWrapper>
          </Column1>
          <Column2>
            <ImgWrap>
              <Img src={img} alt="" />
            </ImgWrap>
          </Column2>
        </InfoRow>
      </InfoWrapper>
      {(designAccentBottom) &&
        <>
          <div style={{
            left: '-5%',
            background: Colors.primary,
            height: '5px',
            width: '110%',
          }} 
          />
        </>
      }
    </InfoContainer>
  );
};

InfoSection.propTypes = {
  data: CustomPropTypes.infoData.isRequired,
};

export default InfoSection;
