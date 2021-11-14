import React from 'react'
import { RouterButton, Button } from '../ButtonElement'
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
    Img
 } from './InfoElements'

const InfoSection = ({button, router, lightBg, id, directions, imgStart, topLine, 
    headline, description, buttonLabel, img}) => {
    return (
        <>
            <InfoContainer lightBg={lightBg} id={id}>
                <InfoWrapper>
                        <InfoRow imgStart={imgStart}>
                            <Column1>
                                <TextWrapper>
                                    <TopLine>{topLine}</TopLine>
                                    <Heading lightText={!lightBg}>{headline}</Heading>
                                    <Subtitle darkText = {lightBg}>{description}</Subtitle>
                                    {button &&
                                        <BtnWrap>{router ? (
                                            <RouterButton 
                                            to={directions} 
                                            primary={lightBg ? 0 : 1}>
                                                {buttonLabel}
                                            </RouterButton>
                                        ) : (
                                            <Button 
                                            to={directions} 
                                            smooth='true' 
                                            primary={lightBg ? 0 : 1}
                                            duration={500}
                                            spy={true}
                                            exact='true'
                                            offset={-80}>
                                                {buttonLabel}
                                            </Button>
                                        )}
                                        </BtnWrap>
                                    }
                                </TextWrapper>
                            </Column1>
                            <Column2>
                                <ImgWrap>
                                    <Img src={img} alt={""}/>
                                </ImgWrap>
                            </Column2>
                        </InfoRow>    
                </InfoWrapper>  
            </InfoContainer>  
        </>
    )
}

export default InfoSection
