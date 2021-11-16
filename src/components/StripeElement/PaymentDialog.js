import React from 'react'
import {getAnalytics, logEvent} from 'firebase/analytics'
import {useStripe} from '@stripe/react-stripe-js';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function PaymentDialog() {
    const stripe = useStripe();
    const analytics = getAnalytics();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState(null);
  
    const handleClose = () => {
      setOpen(false);
    };

    React.useEffect(() => {
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
              const amount = new URLSearchParams(window.location.search).get(
                "amount"
              );
              const currency = new URLSearchParams(window.location.search).get(
                "currency"
              );
              const uid = new URLSearchParams(window.location.search).get(
                "uid"
              );
              logEvent(analytics, 'purchase', {amount, currency, uid})  
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
          setOpen(true);
        });
      }, [stripe, analytics]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Payment
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
     )
}
