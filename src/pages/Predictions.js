import React from 'react'
import Footer from '../components/Footer'
import PredictionTable from '../components/PredictionTable'
import InfoSection from '../components/InfoSection'
import { predictionDescription } from '../components/InfoSection/Data'
import LogoBanner from '../components/LogoBanner'

const Predictions = (props) => {
    return (
        <div style={{backgroundColor: 'white'}}>
            <LogoBanner user={props.user}/>
            <InfoSection {...predictionDescription}/>
            <PredictionTable predictions={props.predictions}/>
            <Footer/>
        </div>
    )
}

export default Predictions
