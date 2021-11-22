import React from 'react'
import { Colors } from '../../styles/Colors';
import { Card, CardContainer } from '../CardElements'
import Button from '@mui/material/Button';

export default function Description(props) {
    return (
        <CardContainer style={{maxWidth: '680px'}}>
            <Card variant='outlined'>
                <h2 style={{
                    paddingBottom: '20px',
                }}>Description</h2>
                
                <div style = {{
                    minHeight: '350px',
                }}>
                    {props.metaData == null ? (
                    <p style={{
                        textAlign: 'center',
                        lineHeight: '350px',
                    }}>Loading...</p>
                    ):(
                        <div>
                            <div style={{
                                paddingBottom: '20px',
                                color: Colors.grey,
                                fontWeight: 400,
                                lineHeight: '2rem',
                            }}>
                                {props.metaData.description}
                            </div>
                            <div>
                                {props.metaData.website && 
                                    <Button
                                        target="_blank"
                                        size='small'
                                        style={{margin: '10px'}}
                                        variant='outlined'
                                        color='black' 
                                        href={props.metaData.website}>
                                        Website
                                    </Button>
                                }
                                {props.metaData.technical_doc && 
                                    <Button
                                        target="_blank"
                                        size='small' 
                                        style={{margin: '10px'}}
                                        variant='outlined'
                                        color='black' 
                                        href={props.metaData.technical_doc}>
                                        Technical Documentation
                                    </Button>
                                }
                                {props.metaData.source_code && 
                                    <Button
                                        target="_blank"
                                        size='small'
                                        style={{margin: '10px'}}
                                        variant='outlined' 
                                        color='black' 
                                        href={props.metaData.source_code}>
                                        Source Code
                                    </Button>
                                }
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </CardContainer>
    )
}
