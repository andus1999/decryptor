import * as React from 'react'
import LogoBanner from '../components/LogoBanner'
import Footer from '../components/Footer';
import LoginElement from '../components/LoginElement';

function Login(props) {   
      
    return (
        <div style={{backgroundColor: 'white'}}>
            <LogoBanner user={props.user}/>
            <LoginElement user={props.user}/>
            <Footer></Footer>
        </div>
    )
}

export default Login
