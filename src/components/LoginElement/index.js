import React from 'react'
import { withRouter, useHistory } from 'react-router';
import {Card, CardContainer} from '../CardElements';
import styled from 'styled-components'
import {Colors} from '../../styles/Colors'
import * as auth from 'firebase/auth'
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css'
import { getAnalytics, logEvent } from "firebase/analytics";


const AuthContainer = styled.div`
    margin: 30px 0 100px 0;

    .firebaseui-idp-google>.firebaseui-idp-text{
    color: ${Colors.black}
    }

    button[data-provider-id="password"], button[data-provider-id="github.com"]{
    background-color: ${Colors.black} !important;
    }
    button[data-provider-id="google.com"]{
    background-color: ${Colors.white} !important;
    }
    a{
    color: ${Colors.black}
    }
    .firebaseui-idp-button {
        border-radius: 100px;
    }

    .firebaseui-textfield.mdl-textfield .firebaseui-label:after {
        background-color: ${Colors.primary} !important;
    }

    .mdl-progress > .progressbar {
        background-color: ${Colors.primary} !important;
    }

    .mdl-progress > .bufferbar {
        background-image: linear-gradient(
                90deg,
                hsla(0, 0%, 100%, 0.7),
                hsla(0, 0%, 100%, 0.7)
            ),
            linear-gradient(90deg, ${Colors.primary}, ${Colors.primary}) !important;
        z-index: 0;
        left: 0;
    }

    .mdl-progress:not(.mdl-progress--indeterminate) > .auxbar,
    .mdl-progress:not(.mdl-progress__indeterminate) > .auxbar {
        background-image: linear-gradient(
                90deg,
                hsla(0, 0%, 100%, 0.9),
                hsla(0, 0%, 100%, 0.9)
            ),
            linear-gradient(90deg, ${Colors.primary}, ${Colors.primary}) !important;
}`

export default withRouter(function LoginElement(props) {

    const history = useHistory();
    const analytics = getAnalytics();

    React.useEffect(() => {
        window.scrollTo(0,0);
        const uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            console.log(authResult)
            logEvent(analytics, 'login', {method: authResult.credential.providerId});
            if(authResult != null) {
                history.goBack()
            }
            return false;
            },
            signInFailure: function(error) {
            console.log(error.code)
            const loader = document.getElementById('loader');
            loader.style.display = 'inline'
            loader.innerHTML = error.code
            },
            uiShown: function() {
            document.getElementById('loader').style.display = 'none';
            }
        },
        signInFlow: 'popup',
        signInOptions: [
            auth.GoogleAuthProvider.PROVIDER_ID,
            {
            provider: auth.EmailAuthProvider.PROVIDER_ID,
            signInMethod: auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
            forceSameDevice: false,
            emailLinkSignIn: function() {
                return {
                url: 'https://decryptor.xyz',
                handleCodeInApp: true
                };
            }
            },
        ],
        tosUrl: '<tos-url>',
        privacyPolicyUrl: '<privacy-policy-url>'
        }

        if(firebaseui.auth.AuthUI.getInstance()) {
        const ui = firebaseui.auth.AuthUI.getInstance()
        ui.start('#firebaseui-auth-container', uiConfig)
        } else {
        const ui = new firebaseui.auth.AuthUI(auth.getAuth())
        ui.start('#firebaseui-auth-container', uiConfig)
        }    
    }, [history, analytics])

    return (
        <div style={{
            textAlign: 'center',
            margin: '100px 0',
          }}>
            <CardContainer style={{maxWidth: '680px'}}>
              <Card variant='outlined'>
                <h1 style={{
                    margin: '100px 0 20px 0',
                    textAlign: 'center'
                }}>Sign in</h1>
                <p style={{
                  textAlign: 'center',
                  color: Colors.primary
                }}>Select a method for signing in</p>
                <AuthContainer id="firebaseui-auth-container"></AuthContainer>
                <div id="loader" style={{
                  textAlign: 'center',
                  height: '198px',
                  margin: '30px 0 100px 0'}}>Loading...</div>
              </Card>
            </CardContainer>
          </div>
    )
})
