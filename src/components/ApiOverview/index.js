import React from 'react'
import ApiCalls from './ApiCalls'
import BuyCalls from './BuyCalls'

export default function ApiOverview(props) {
    return (
        <div style={{
            maxWidth: '1100px', 
            margin: '0 auto',
            textAlign: 'center'}}>
            <ApiCalls user={props.user}/>
            {props.user && <BuyCalls user={props.user}/>}
        </div>
    )
}
