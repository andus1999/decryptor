import React from 'react';
import { getAnalytics, logEvent } from 'firebase/analytics';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import InfoSection from '../components/InfoSection';
import { homeObjOne, homeObjTwo, homeObjThree } from '../components/InfoSection/Data';
import Services from '../components/Services';
import Footer from '../components/Footer';
import CustomPropTypes from '../types/CustomPropTypes';
import PageContainer from './PageContainer';


const Home = function homePage({ user, predictions }) {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const analytics = getAnalytics();
    logEvent(analytics, 'screen_view', {
      firebase_screen: 'home',
      firebase_screen_class: 'info',
    });
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <PageContainer>
      <Sidebar isOpen={isOpen} toggle={toggle} user={user} />
      <Navbar toggle={toggle} user={user} />
      <HeroSection predictions={predictions} />
      <Services predictions={predictions} />
      <InfoSection data={homeObjOne} />
      <InfoSection data={homeObjTwo} />
      <InfoSection data={homeObjThree} />
      <Footer />
    </PageContainer>
  );
};

Home.propTypes = {
  user: CustomPropTypes.user,
  predictions: CustomPropTypes.predictions,
};

Home.defaultProps = {
  predictions: null,
  user: null,
};

export default Home;
