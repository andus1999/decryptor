import React from 'react';
import { useLocation } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';
import CoinOverview from '../components/CoinOverview';
import LogoBanner from '../components/LogoBanner';
import Footer from '../components/Footer';
import CustomPropTypes from '../types/CustomPropTypes';
import PageContainer from './PageContainer';


const Coin = function coinInfo({ user, predictions, bitcoinMarketCap }) {
  const [metaData, setMetaData] = React.useState(null);

  const db = getFirestore();
  const location = useLocation();

  React.useEffect(() => {
    const analytics = getAnalytics();
    logEvent(analytics, 'screen_view', {
      firebase_screen: 'coin',
      firebase_screen_class: 'info',
    });
  }, []);

  const coinLink = location.pathname.split('/').at(-1);
  const predictionData = predictions?.[coinLink];

  React.useEffect(() => {
    const getMetaData = async () => {
      const docSnap = await getDoc(doc(db, 'coins', coinLink));
      const data = docSnap.data();
      setMetaData(data);
    };
    if (metaData == null) {
      window.scrollTo(0, 0);
      getMetaData();
    }
  }, [metaData, db, coinLink]);

  return (
    <PageContainer>
      <LogoBanner user={user} />
      {(predictionData == null || bitcoinMarketCap == null) ? (
        <h1 style={{
          textAlign: 'center',
          padding: '50px',
          marginTop: '80px',
        }}
        >
          Loading...
        </h1>
      ) : (
        <div>
          <CoinOverview
            predictionData={predictionData}
            metaData={metaData}
            bitcoinMarketCap={bitcoinMarketCap}
          />
        </div>
      )}
      <Footer user={user} />
    </PageContainer>
  );
};

Coin.propTypes = {
  user: CustomPropTypes.user,
  predictions: CustomPropTypes.predictions,
  bitcoinMarketCap: CustomPropTypes.number,
};

Coin.defaultProps = {
  user: null,
  predictions: null,
  bitcoinMarketCap: null,
};

export default Coin;
