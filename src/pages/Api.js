import React from 'react'
import ApiEndpoints from '../components/ApiEndpoints'
import ApiOverview from '../components/ApiOverview'
import Footer from '../components/Footer'
import InfoSection from '../components/InfoSection'
import { apiDescription } from '../components/InfoSection/Data'
import LogoBanner from '../components/LogoBanner'
import {getAnalytics, logEvent} from 'firebase/analytics'
import {useStripe} from '@stripe/react-stripe-js';

const Api = (props) => {

  const stripe = useStripe();
  const analytics = getAnalytics();

  const [message, setMessage] = useState(null);

  useEffect(() => {
    window.scrollTo(0,0)        
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          logEvent(analytics, 'purchase', {
              value: paymentIntent.metadata.amount/100,
              currency: paymentIntent.metadata.currency,
              uid: paymentIntent.metadata.uid,
          })  
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

    return (
        <div style={{backgroundColor: 'white'}}>
            <LogoBanner user={props.user}/>
            <InfoSection {...apiDescription}/>
            <ApiOverview user={props.user}/>
            <ApiEndpoints user={props.user}/>
            <Footer/>
        </div>
    )
}

export default Api
