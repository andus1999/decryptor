import React, {useState} from 'react'
import Video from '../../media/video.mp4'
import Button from '@mui/material/Button'
import {scroller} from 'react-scroll';

import { 
    HeroContainer,
    HeroBg,
    VideoBg,
    HeroContent,
    HeroH1,
    HeroP,
    HeroBtnWrapper,
    ArrowForward,
    ArrowRight
 } from './HeroElements'

const HeroSection = () => {
    const [hover, setHover] = useState(false)

    const onHover = () => {
        setHover(!hover)
    }

    const scrollBehavior = () => {
        scroller.scrollTo('about', {
            duration: 500,
            smooth: true,
            offset: 0,
            spy: true,
        });
    };

    return (
        <HeroContainer>
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
            </HeroBg>
            <HeroContent>
                <HeroH1>Cryptocurrency made easy.</HeroH1>
                <HeroP>
                    Find out which coins to buy. With simple graphs and price predictions.
                </HeroP>
                <HeroBtnWrapper>
                    <Button onMouseEnter={onHover} 
                        onMouseLeave={onHover}
                        variant='contained'
                        onClick={scrollBehavior}
                    >
                        Get started {hover ? <ArrowForward /> : <ArrowRight/>}
                    </Button>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection
