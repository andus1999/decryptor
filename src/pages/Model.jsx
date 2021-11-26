import React from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAnalytics, logEvent } from 'firebase/analytics';
import Footer from '../components/Footer';
import InfoSection from '../components/InfoSection';
import { modelDescription, dataDescription } from '../components/InfoSection/Data';
import LogoBanner from '../components/LogoBanner';
import Correlation from '../components/Correlation';
import CustomPropTypes from '../types/CustomPropTypes';

const Model = function modelInfo({ user }) {
  React.useEffect(() => {
    const analytics = getAnalytics();
    logEvent(analytics, 'screen_view', {
      firebase_screen: 'model',
      firebase_screen_class: 'info',
    });
  }, []);

  const db = getFirestore();
  const [modelData, setModelData] = React.useState(null);

  React.useEffect(() => {
    const getModelData = async () => {
      const docSnap = await getDoc(doc(db, 'models', 'main'));
      const data = docSnap.data().correlation_data;
      setModelData(data.map((it) => {
        const obj = {};
        obj.correlation = it.test_correlation;
        obj.valCorrelation = it.max_val_correlation;
        obj.date = it.timestamp;
        return obj;
      }));
    };
    getModelData();
    window.scrollTo(0, 0);
  }, [db]);
  return (
    <div style={{ backgroundColor: 'white' }}>
      <LogoBanner user={user} />
      <InfoSection data={modelDescription} />
      <Correlation modelData={modelData} />
      <InfoSection data={dataDescription} />
      <Footer />
    </div>
  );
};

Model.propTypes = {
  user: CustomPropTypes.user.isRequired,
};

export default Model;
