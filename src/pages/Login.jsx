import * as React from 'react';
import { getAnalytics, logEvent } from 'firebase/analytics';
import LogoBanner from '../components/LogoBanner';
import LoginElement from '../components/LoginElement';
import Footer from '../components/Footer';
import CustomPropTypes from '../types/CustomPropTypes';

const Login = function loginScreen({ user }) {
  React.useEffect(() => {
    const analytics = getAnalytics();
    logEvent(analytics, 'screen_view', {
      firebase_screen: 'login',
      firebase_screen_class: 'input',
    });
  }, []);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <LogoBanner user={user} />
      <LoginElement user={user} />
      <Footer />
    </div>
  );
};

Login.propTypes = {
  user: CustomPropTypes.user.isRequired,
};

export default Login;
