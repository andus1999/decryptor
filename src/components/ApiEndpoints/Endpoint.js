import React from 'react'
import {Card, CardContainer} from '../CardElements'
import { Colors } from '../../styles/Colors'
import TextField from '@mui/material/TextField';
import { DefaultButton } from '../ButtonElement';
import CircularProgress from '@mui/material/CircularProgress';
import { getAnalytics, logEvent } from "firebase/analytics";
import Collapse from '@mui/material/Collapse';

export default function Endpoint(props) {
    const [variables, setVariables] = React.useState({});
    const [response, setResponse] = React.useState(null);
    const [hideResponse, setHideResponse] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const analytics = getAnalytics();

    const url = "https://decryptor.xyz/api/v1";

    const getApiUrl = () => {
        var apiUrl = url;
        props.data.endpoint.forEach((it) => {
            apiUrl += '/'
            if(it.startsWith(':')){
                apiUrl += variables[it]
            } else {
                apiUrl += it
            }
        })
        return apiUrl
    }

    const onChange = (id) => (event) => {
        variables[id] = event.target.value;
        setVariables(variables);
    }

    const onClick = async (e) => {
        e.preventDefault();
        if(hideResponse === false){
            setHideResponse(true);
            return;
        }
        
        logEvent(analytics, 'endpoint_request', props.user);
        setResponse(null)
        setLoading(true)
        const apiUrl = getApiUrl()
        console.log(apiUrl)
        const params = {
            headers: {
                'key': props.user.uid,
            },
        }
        fetch(apiUrl, params)
        .then(response => response.text())
        .then(text =>{
            setHideResponse(false)
            setResponse(text)
            setLoading(false)
        })
        .catch(()=>{
            setHideResponse(false)
            setResponse('Sorry, an error occured.')
            setLoading(false)
        })        
    }

    const container = {
        display: 'inline-block',
        verticalAlign: 'middle',
        padding: '10px',
    }

    const text = {
        fontSize: '1.2rem'
    }

    const endpoint = []
    props.data.endpoint.forEach((item, index) => {
        if (index === 0) {
            endpoint.push(
                <div style={container} key={'link'}>
                    <p style={{color: Colors.grey}}>{url}</p>
                </div>
            )
        }
        endpoint.push(
            <div style={container} key={'slash'+index}>
                <h3 style={text}>/</h3>
            </div>
        )
        if(item.startsWith(':')){
            endpoint.push(
                <div style={container} key={'url-component'+index}>
                    <TextField
                        size="small"
                        onChange={onChange(item)}
                        autoComplete='off'
                        id="outlined-basic" 
                        label={item.slice(1)} 
                        variant="outlined"
                        InputProps={{style: {fontFamily: 'Sora', fontSize: '15px'}}}
                        InputLabelProps={{style: {fontFamily: 'Sora', fontSize: '15px'}}}
                    />
                </div>
            )
        } else {
            endpoint.push(
                <div style={container} key={'url-component'+index}>
                    <h3 style={text}>{item}</h3>
                </div>
            )
        }
    })
    return (
        <CardContainer style={{
            maxWidth: '550px',
            textAlign: 'center',
        }}>
            <Card variant='outlined'>
                <h1 style={{padding: '10px'}}>{props.data.title}</h1>
                <p style={{
                    color: Colors.primary,
                    padding: '10px',
                    lineHeight: '30px'}}>{props.data.action}</p>
                <form onSubmit={onClick} key='test'>
                    <div>{endpoint}</div>
                    {props.user && <div style={{
                        padding: '30px',
                        textAlign: 'center',}}>
                            {loading ? (
                                <CircularProgress/>
                            ):( <>
                                    {hideResponse ? (
                                        <DefaultButton style={{
                                            display: 'inline-block',
                                        }}>Call</DefaultButton>
                                    ):(
                                        <DefaultButton style={{
                                            display: 'inline-block',
                                        }}>Clear</DefaultButton>
                                    )}
                                </>
                            )}
                    </div>}
                </form>
                <Collapse in={!hideResponse}>
                    <h2 style={{
                        textAlign: 'center',
                        padding: '20px'}}>Response</h2>   
                    <div style={{
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        height: '200px',
                        overflowWrap: 'break-word',
                        padding: '10px',
                    }}>
                        {response}
                    </div>
                </Collapse>
            </Card>       
        </CardContainer>
    )
}
