import * as React from 'react'
import LogoBanner from '../components/LogoBanner'
import Footer from '../components/Footer';
import LoginElement from '../components/LoginElement';
import { getAnalytics, logEvent } from "firebase/analytics";


function Login(props) {
    React.useEffect(() => {
        const analytics = getAnalytics();
        logEvent(analytics, 'screen_view', {
            firebase_screen: 'login', 
            firebase_screen_class: 'input'
        });
    }, [])
      
    return (
        <div style={{backgroundColor: 'white'}}>
            <LogoBanner user={props.user}/>
            <LoginElement user={props.user}/>
            <Footer></Footer>
        </div>
    )
}

export default Login
