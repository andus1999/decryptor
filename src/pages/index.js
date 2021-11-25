import React, {useState, useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import InfoSection from '../components/InfoSection'
import { homeObjOne, homeObjTwo, homeObjThree } from '../components/InfoSection/Data'
import Services from '../components/Services'
import Footer from '../components/Footer'
import { getAnalytics, logEvent } from "firebase/analytics";


const Home = (props) => {
    React.useEffect(() => {
        const analytics = getAnalytics();
        logEvent(analytics, 'screen_view', {
            firebase_screen: 'home', 
            firebase_screen_class: 'info'
        });
    }, [])

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div style={{backgroundColor: 'white'}}>
            <Sidebar isOpen={isOpen} toggle={toggle} user={props.user} />
            <Navbar toggle={toggle} user={props.user}/>
            <HeroSection />
            <InfoSection {...homeObjOne}/> 
            <InfoSection {...homeObjTwo}/>
            <Services predictions={props.predictions}/>   
            <InfoSection {...homeObjThree}/>
            <Footer />    
        </div>
    )
}

export default Home
