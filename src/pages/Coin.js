import React from 'react'
import CoinOverview from '../components/CoinOverview'
import LogoBanner from '../components/LogoBanner'
import { useLocation } from 'react-router'
import Footer from '../components/Footer'
import { getFirestore, doc, getDoc } from "firebase/firestore";


export default function Coin(props) {
    const db = getFirestore();

    const [historicalData, setHistoricalData] = React.useState(null)

    const location = useLocation();

    const coinLink = location.pathname.split('/').at(-1)
    
    React.useEffect(() => {
        const getHistoricalData = async () => {
            const docSnap = await getDoc(doc(db, 'coins', coinLink));
            const data = docSnap.data().historical_data
            data.forEach(element => {
                element.timestamp += 3600*24;
            });
            setHistoricalData(data)
        }
        if (historicalData == null){
            window.scrollTo(0,0)
            getHistoricalData();
        }
    }, [historicalData, db, coinLink])

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
                    historicalData={historicalData}
                    bitcoinMarketCap={props.bitcoinMarketCap}/>
                </div>
            )}
            <Footer/>
        </div>
    )
}
