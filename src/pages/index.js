import React, {useState, useEffect} from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import InfoSection from '../components/InfoSection'
import { homeObjOne, homeObjTwo, homeObjThree } from '../components/InfoSection/Data'
import Services from '../components/Services'
import Footer from '../components/Footer'

const Home = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <Sidebar isOpen={isOpen} toggle={toggle} user={props.user} />
            <Navbar toggle={toggle} user={props.user}/>
            <HeroSection />
            <InfoSection {...homeObjOne}/> 
            <InfoSection {...homeObjTwo}/>
            <Services predictions={props.predictions}/>   
            <InfoSection {...homeObjThree}/>
            <Footer />    
        </>
    )
}

export default Home
