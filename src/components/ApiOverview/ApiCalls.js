import React from 'react'
import { Colors } from '../../styles/Colors'
import Button from '@mui/material/Button';
import {getAuth} from 'firebase/auth'
import {Card, CardContainer} from '../CardElements'
import {Link as RouterLink} from 'react-router-dom';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function ApiCalls(props) {
    const [buttonText, setButtonText] = React.useState('Copy to Clipboard')
    const [idToken, setIdToken] = React.useState(null)
    React.useEffect(() => {
        if (props.user != null && idToken == null){
            getAuth().currentUser.getIdToken(true).then(function(idToken) {
                setIdToken(idToken)
              }).catch(function(error) {
            });
        }
    }, [props.user, idToken])  

    const block = {
        display: 'inline-block',
        margin: '20px 60px'
    }

    const heading = {
        color: Colors.grey,
        marginBottom: '20px'
    }

    const content = {
        color: Colors.white,
        fontSize: '2rem'
    }

    const overviewHeading = {
        margin: '20px 0 40px 0',
        color: Colors.black,
        fontSize: '2rem'
    }

    const primaryHeading = {
        color: Colors.primary,
        margin: '50px 0 20px 0'
    }

    const buttonContainer = {
        margin: '20px 0 40px 0',
        textAlign: 'center',
        display: 'inline-block'
    }

    return (
        <CardContainer style={{maxWidth: '680px', textAlign: 'center'}}>
            {props.user ? (
                <Card variant='outlined'>
                    <h2 style={overviewHeading}>API Overview</h2>
                    <div style = {{
                        background: Colors.black,
                        borderRadius: '20px',
                        display: 'inline-block',
                        padding: '20px'}}>
                        <div style = {block}>
                            <p style={heading}>Free API Calls</p>
                            <h3 style={content}>{numberWithCommas(props.user?.freeApiCalls)}</h3> 
                        </div>
                        <div style = {block}>
                            <p style={heading}>Paid API Calls</p>
                            <h3 style={content}>{numberWithCommas(props.user?.paidApiCalls)}</h3> 
                        </div>
                    </div>
                    <h3 style={primaryHeading}>Your API Token</h3>
                    <div style={buttonContainer}>
                        <Button
                            onClick={(event)=>{
                                event.preventDefault();
                                navigator.clipboard.writeText(props.user.uid)
                                setButtonText('Copied successfully')
                                setTimeout(function() { setButtonText('Copy to Clipboard') }, 5000);
                            }}
                            variant='contained'>
                            {buttonText}
                        </Button>
                    </div>
                </Card>
            ):(
                <Card variant='outlined'>
                    <h2 style={overviewHeading}>API Overview</h2>
                    <h3 style={primaryHeading}>Not signed in to an Account</h3>
                    <div style={buttonContainer}>
                        <Button 
                        to='/sign-in'
                        component={RouterLink}
                        variant='contained'>
                            Sign In</Button>
                    </div>
                </Card>
            )}
        </CardContainer>
    )
}
