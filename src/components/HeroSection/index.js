import React, {useState} from 'react'
import Video from '../../media/video.mp4'
import { Button } from '../ButtonElement'
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
                    <Button to='about' onMouseEnter={onHover} 
                    onMouseLeave={onHover}
                    primary='true'
                    smooth='true' duration={500} spy={true} 
                    exact='true' offset={-80}>
                        Get started {hover ? <ArrowForward /> : <ArrowRight/>}
                    </Button>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection
