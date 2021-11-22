import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './pages';
import Predictions from './pages/Predictions';
import Coin from './pages/Coin'
import Model from './pages/Model'
import Api from './pages/Api'
import * as React from 'react';
import Login from './pages/Login';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { getFirestore, onSnapshot, doc, getDoc} from "firebase/firestore"
import Payments from './pages/Payments';
import { ThemeProvider } from '@mui/material/styles';
import { mainTheme } from './styles/Themes';
import { getAnalytics, logEvent } from "firebase/analytics";

function App() {
  const [predictions, setPredictions] = React.useState(null);
  const [bitcoinMarketCap, setBitcoinMarketCap] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const analytics = getAnalytics();

  const auth = getAuth()
  const db = getFirestore()
  var unsubscribeDB = () => {};

  React.useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn');
       })
        .catch((error) => {
        });
    }
    const unsubscribe = auth.onAuthStateChanged(async function(data){
      if (data != null){
        if (data.uid !== user?.uid){
          onSnapshot(doc(db, "users", data.uid), (doc) => {
            setUser(doc.data());
          });
        }
      }
      else{
        logEvent(analytics, 'logout', user);
        unsubscribeDB();
        setUser(null)
      }
    })
    return () => {
      unsubscribe();
    }
  }, [auth, db, analytics, user])


  React.useEffect(() => {

    const getPredictions = async () => {
      const docSnap = await getDoc(doc(db, 'predictions', 'main'));
      const predictionData = docSnap.data()
      const pred = []
  
      Object.keys(predictionData).forEach(function(key) {
        const data = predictionData[key]
        if (key === 'bitcoin'){
          setBitcoinMarketCap(data.market_data.market_cap)
        }
        const prediction = data['prediction']

        let obj = {};
        obj.id = data.id;
        obj.ticker = data.ticker;
        obj.currency = data.name;
        obj.volatility = Math.round(prediction.volatility * 100);
        obj.prediction = Math.round(prediction.average*10000)/100;
        obj.predictionLow = Math.round(prediction.low*10000)/100;
        obj.predictionHigh = Math.round(prediction.high*10000)/100;
        obj.date = data.market_data.timestamp+3600*24;
        obj.timestampTarget = prediction.timestamp;
        obj.currentPrice = data.market_data.close;
        obj.priceTargetLow = (obj.currentPrice*(prediction.low+1));
        obj.priceTarget = (obj.currentPrice*(prediction.average+1));
        obj.priceTargetHigh = (obj.currentPrice*(prediction.high+1));
        pred.push(obj);
      })
  
      setPredictions(pred);      
      setLoading(false);
    }

    if (loading === false){
      setLoading(true);
      if (predictions == null || bitcoinMarketCap == null){
        getPredictions();
        logEvent(analytics, 'page_load');
      }
    }
  }, [loading, predictions, bitcoinMarketCap, db, analytics]);

  return (
    <ThemeProvider theme={mainTheme}>
      <Router>
        <Switch>
          <Route path="/" render={() => <Home predictions={predictions} user={user}/>} exact />
          <Route path="/predictions" 
          render={() => <Predictions predictions={predictions} user={user}/>} 
          exact />
          <Route path="/predictions/:name" 
          render={() => <Coin 
            predictions={predictions}
            bitcoinMarketCap={bitcoinMarketCap} user={user}/>} 
          exact />
          <Route path="/model" render={() => <Model user={user}/>} exact/>
          <Route path="/api" render={() => <Api user={user}/>} exact/>
          <Route path="/sign-in" render={() => <Login user={user}/>} exact/>
          <Route path="/pay" render={() => <Payments user={user}/>} exact/>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
