import React from 'react'
import Rounter from 'react-router-dom'
import ApiEndpoints from '../components/ApiEndpoints'
import ApiOverview from '../components/ApiOverview'
import Footer from '../components/Footer'
import InfoSection from '../components/InfoSection'
import { apiDescription } from '../components/InfoSection/Data'
import LogoBanner from '../components/LogoBanner'
import {Elements} from '@stripe/react-stripe-js'
import PaymentDialog from '../components/StripeElement/PaymentDialog'
import {loadStripe} from '@stripe/stripe-js';
import { getAnalytics, logEvent } from "firebase/analytics";

const Api = (props) => {
    React.useEffect(() => {
        const analytics = getAnalytics();
        logEvent(analytics, 'screen_view', {
            firebase_screen: 'api', 
            firebase_screen_class: 'interactive'
        });
    }, [])

    var stripePromise = null
    if(window.location.hostname === "localhost"){
        stripePromise = loadStripe('pk_test_51Jrpx0Ke5TUGpxZvikMyMs900upQAhCeDB2ozEDDptm0I5LwE537WYIEnbdkKgV1xLbVSuNbR9OTes3yRafwfVt800MmOtk07w');
    } else {
        stripePromise = loadStripe('pk_live_51Jrpx0Ke5TUGpxZvEiomXVy7xlRLB5wx75iLEubyMLglfNhynjzsFEbkWOEU5VGtanYXEDL4B9J41uJKTbIlqKY800J2Yct2LW');
    }
    return (
        <div style={{backgroundColor: 'white'}}>
            <LogoBanner user={props.user}/>
            <InfoSection {...apiDescription}/>
            <ApiOverview user={props.user}/>
            <ApiEndpoints user={props.user}/>
            <Elements stripe={stripePromise}>
                <PaymentDialog/>
            </Elements>
            <Footer/>
        </div>
    )
}

export default Api
