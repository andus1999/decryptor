import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as React from 'react';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import {
  getFirestore, onSnapshot, doc, getDoc,
} from 'firebase/firestore';
import { ThemeProvider } from '@mui/material/styles';
import { getAnalytics, logEvent } from 'firebase/analytics';
import Home from './pages';
import Predictions from './pages/Predictions';
import Coin from './pages/Coin';
import Model from './pages/Model';
import Api from './pages/Api';
import Login from './pages/Login';
import Payments from './pages/Payments';
import { mainTheme } from './styles/Themes';

const App = function reactApp() {
  const [predictions, setPredictions] = React.useState(null);
  const [bitcoinMarketCap, setBitcoinMarketCap] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const analytics = getAnalytics();

  const auth = getAuth();
  const db = getFirestore();
  let unsubscribeDB = () => {};

  React.useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          window.localStorage.removeItem('emailForSignIn');
        })
        .catch(() => {
        });
    }
    const unsubscribe = auth.onAuthStateChanged(async (data) => {
      if (data != null) {
        if (data.uid !== user?.uid) {
          unsubscribeDB = onSnapshot(doc(db, 'users', data.uid), (document) => {
            setUser(document.data());
          }, () => {});
        }
      } else {
        unsubscribeDB();
        logEvent(analytics, 'logout', user);
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [auth, db, analytics, user]);

  React.useEffect(() => {
    const getPredictions = async () => {
      const docSnap = await getDoc(doc(db, 'predictions', 'main'));
      const predictionData = docSnap.data();
      setBitcoinMarketCap(predictionData.bitcoin.market_data.market_cap);
      setPredictions(predictionData);
      setLoading(false);
    };

    if (loading === false) {
      setLoading(true);
      if (predictions == null || bitcoinMarketCap == null) {
        getPredictions();
        logEvent(analytics, 'page_load');
      }
    }
  }, [loading, predictions, bitcoinMarketCap, db, analytics]);

  return (
    <ThemeProvider theme={mainTheme}>
      <Router>
        <Switch>
          <Route path="/" render={() => <Home predictions={predictions} user={user} />} exact />
          <Route
            path="/predictions"
            render={() => <Predictions predictions={predictions} user={user} />}
            exact
          />
          <Route
            path="/predictions/:name"
            render={() => (
              <Coin
                predictions={predictions}
                bitcoinMarketCap={bitcoinMarketCap}
                user={user}
              />
            )}
            exact
          />
          <Route path="/model" render={() => <Model user={user} />} exact />
          <Route path="/api" render={() => <Api user={user} />} exact />
          <Route path="/sign-in" render={() => <Login user={user} />} exact />
          <Route path="/pay" render={() => <Payments user={user} />} exact />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
