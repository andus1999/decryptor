import React from 'react'
import Footer from '../components/Footer'
import PredictionTable from '../components/PredictionTable'
import InfoSection from '../components/InfoSection'
import { predictionDescription } from '../components/InfoSection/Data'
import LogoBanner from '../components/LogoBanner'
import { getAnalytics, logEvent } from "firebase/analytics";


const Predictions = (props) => {
    React.useEffect(() => {
        const analytics = getAnalytics();
        logEvent(analytics, 'screen_view', {
            firebase_screen: 'predictions', 
            firebase_screen_class: 'interactive'
        });
    }, [])

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
