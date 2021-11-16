import React from 'react'
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import {DefaultButton} from '../ButtonElement'
import { CircularProgress } from '@mui/material';
import { Colors } from '../../styles/Colors';
import Fade from '@mui/material/Fade';
import Collapse from '@mui/material/Collapse';
import { getAnalytics, logEvent } from "firebase/analytics";


export default function Form(props) {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    const analytics = getAnalytics();

    const handleSubmit = async (event) => {
        console.log('submit')
        setLoading(true);
        setError('Redicecting...')
        event.preventDefault();

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }
        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://decryptor.xyz/api",
            },
        });
        if (result.error) {
            setLoading(false);
            console.log(result.error.message);
            setError(result.error.message)
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            logEvent(analytics, 'purchase', {
                value: props.amount/100,
                currency: props.currency,
                uid: props.uid,
            })
        }
    };

    return (
        <form style={{padding: '20px'}} onSubmit={handleSubmit}>
            <div>
                <Collapse in={!loading} collapsedSize={1}>
                    <div style={{height: '1px'}}/>
                    <PaymentElement onReady={() => setTimeout(() => setLoading(false), 500)}/>
                </Collapse>
            </div>
            {error && <h3 style={{
                margin: '30px 0 0',
                color: Colors.primary,
            }}>{error}</h3>}
            <div style={{
                padding: '0 0 20px',
                display: 'inline-block',
            }}>
                <Fade in={loading}>
                    <CircularProgress/>
                </Fade>
                <Fade in={!loading}>
                    <DefaultButton>Submit</DefaultButton>
                </Fade>
            </div>
        </form>
    )
}
