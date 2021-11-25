import React from 'react'
import CoinOverview from '../components/CoinOverview'
import LogoBanner from '../components/LogoBanner'
import { useLocation } from 'react-router'
import Footer from '../components/Footer'
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";



export default function Coin(props) {
    React.useEffect(() => {
        const analytics = getAnalytics();
        logEvent(analytics, 'screen_view', {
            firebase_screen: 'coin', 
            firebase_screen_class: 'info'
        });
    }, [])

    const db = getFirestore();

    const [metaData, setMetaData] = React.useState(null)

    const location = useLocation();

    const coinLink = location.pathname.split('/').at(-1)
    
    React.useEffect(() => {
        const getMetaData = async () => {
            const docSnap = await getDoc(doc(db, 'coins', coinLink));
            const data = docSnap.data()
            setMetaData(data)
        }
        if (metaData == null){
            window.scrollTo(0,0)
            getMetaData();
        }
    }, [metaData, db, coinLink])

    const prediction = props.predictions?.filter(x => coinLink === x.id)[0]
    return (
        <div style={{backgroundColor: 'white'}}>
            <LogoBanner user={props.user}/>
            {prediction == null ? (
                <h1 style={{
                    textAlign: 'center',
                    padding: '50px',
                    marginTop: '80px'
                }}>Loading...</h1>
            ) : (
                <div>
                    <CoinOverview 
                    prediction={prediction}
                    metaData={metaData}
                    bitcoinMarketCap={props.bitcoinMarketCap}/>
                </div>
            )}
            <Footer/>
        </div>
    )
}
