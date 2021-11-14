import React from 'react'
import Footer from '../components/Footer'
import LogoBanner from '../components/LogoBanner'
import StripeElement from '../components/StripeElement'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js';
import { Colors } from '../styles/Colors'
import {useLocation} from 'react-router-dom'

const stripePromise = loadStripe('pk_live_51Jrpx0Ke5TUGpxZvEiomXVy7xlRLB5wx75iLEubyMLglfNhynjzsFEbkWOEU5VGtanYXEDL4B9J41uJKTbIlqKY800J2Yct2LW');
const appearance = {
    theme: 'flat',
  
    variables: {
      colorPrimary: Colors.primary,
      colorText: Colors.white,
      colorDanger: Colors.primaryLight,
      fontFamily: 'Sora',
      spacingUnit: '5px',
      borderRadius: '20px',
      colorBackground: Colors.black,
    }, rules: {
        '.Label':{
            color: Colors.white
        }
    }
};

export default function Payments(props) {
    const location = useLocation(); 
    const paymentIntent = location.state.intent;

    const options = {
        clientSecret: paymentIntent.client_secret,
        appearance, 
    }

    return (
        <div>
            <LogoBanner user={props.user}/>
            <Elements stripe={stripePromise} options={options}>
                <StripeElement amount={paymentIntent.metadata.amount}/>
            </Elements>
            <Footer/>
        </div>
    )
}
