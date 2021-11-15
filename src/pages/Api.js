import React from 'react'
import ApiEndpoints from '../components/ApiEndpoints'
import ApiOverview from '../components/ApiOverview'
import Footer from '../components/Footer'
import InfoSection from '../components/InfoSection'
import { apiDescription } from '../components/InfoSection/Data'
import LogoBanner from '../components/LogoBanner'

const Api = (props) => {
    React.useEffect(() => {
        window.scrollTo(0,0)        
    }, [])
    return (
        <div style={{backgroundColor: 'white'}}>
            <LogoBanner user={props.user}/>
            <InfoSection {...apiDescription}/>
            <ApiOverview user={props.user}/>
            <ApiEndpoints user={props.user}/>
            <Footer/>
        </div>
    )
}

export default Api
