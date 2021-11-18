import React from 'react'
import Winners from '../../media/winners.svg'
import Rocket from '../../media/rocket.svg'
import Stars from '../../media/stars.svg'
import { CardContainer, Card } from '../CardElements'

import { Colors } from '../../styles/Colors'
import { 
    ServicesContainer,
    ServicesH1,
    ServicesWrapper,
    ServicesCard,
    ServicesH2,
    ServicesIcon,
    ServicesP 
} from './ServicesElements'

const Services = (props) => {

    function getLink(prediction){
        let link = prediction.id
        return '/predictions/'+link
    }

    const topPredictions = props.predictions?.sort((a,b) => {return(b.prediction - a.prediction)})
    const pStyle = {
        color: Colors.grey
    }
    return (
        <ServicesContainer id="topPredictions">
            <ServicesH1>Top Predictions</ServicesH1>
            {topPredictions ? (
                <ServicesWrapper>
                    <CardContainer>
                        <Card variant='outlined'>
                            <ServicesCard to={getLink(topPredictions[0])}>
                                <ServicesIcon src={Winners}/>
                                <ServicesH2>{'1. '+topPredictions[0].currency}</ServicesH2>
                                <p style={pStyle}>Prediction</p>
                                <ServicesP>{topPredictions[0].prediction+' %'}</ServicesP>
                            </ServicesCard>
                        </Card>
                    </CardContainer>
                    <CardContainer>
                        <Card variant='outlined'>
                            <ServicesCard to={getLink(topPredictions[1])}>
                                <ServicesIcon src={Rocket}/>
                                <ServicesH2>{'2. '+topPredictions[1].currency}</ServicesH2>
                                <p style={pStyle}>Prediction</p>
                                <ServicesP>{topPredictions[1].prediction+' %'}</ServicesP>
                            </ServicesCard>
                        </Card>
                    </CardContainer>
                    <CardContainer>
                        <Card variant='outlined'>
                            <ServicesCard to={getLink(topPredictions[2])}>
                                <ServicesIcon src={Stars}/>
                                <ServicesH2>{'3. '+topPredictions[2].currency}</ServicesH2>
                                <p style={pStyle}>Prediction</p>
                                <ServicesP>{topPredictions[2].prediction+' %'}</ServicesP>
                            </ServicesCard>
                        </Card>
                    </CardContainer>
            </ServicesWrapper>
        ) : (
            <div>Loading...</div>)}  
        </ServicesContainer>
    )
}

export default Services