import React from 'react'
import Button from '@mui/material/Button'

export default function FooterButton(props) {
    return (
        <div style={{
            padding: '1px 0'
        }}>
            <Button
            sx={{
                textAlign: 'left',
                fontSize: 12,
                ':hover': {
                    color: 'primary.main',
                },
            }}
            onClick={props.onClick}
            color='white'>
                {props.children}
            </Button>
        </div>
    )
}
