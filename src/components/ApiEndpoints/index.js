import React from 'react'
import {data} from './Data'
import Endpoint from './Endpoint'
import { Colors } from '../../styles/Colors'
import {Card, CardContainer} from '../CardElements'

export default function ApiEndpoints(props) {
    const endpoints = data.map((item) => {
        return <Endpoint data={item} user={props.user}/>
    })
    return (
        <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '100px 0'}}
            id='endpoints'>
            <h1 style={{
                textAlign: 'center',
                marginBottom: '20px'}}>API Endpoints</h1>
            <div style={{
                margin: '0 auto',
                maxWidth: '1100px',
            }}>
                {props.user ? <CardContainer style={{maxWidth: '550px'}}>
                    <Card variant='outlined'>
                        <h3 style={{padding: '20px'}}>You need to authorize all API requests with your API key</h3>
                        <p style={{padding: '20px 20px 10px'}}>Every request must contain the following header:</p>
                        <p style={{
                            color: Colors.primary,
                            overflowWrap: 'break-word',
                            padding: '20px'}}>key: {props.user.uid}</p>
                    </Card>
                </CardContainer> : 
                <p style={{
                    textAlign: 'center',
                    margin: '20px'}}>Sign in to test all endpoints.</p>}
                {endpoints}
            </div>
        </div>
    )
}
