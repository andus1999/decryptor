import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';
import App from './App';

const firebaseConfig = {
  apiKey: 'AIzaSyCN1w6Nd5zIPH_qzjyBCtn9Lg4ZMR1d8pU',
  authDomain: 'decryptor-329419.firebaseapp.com',
  projectId: 'decryptor-329419',
  storageBucket: 'decryptor-329419.appspot.com',
  messagingSenderId: '1078715077596',
  appId: '1:1078715077596:web:ec351ff6f73b27787d3519',
  measurementId: 'G-2C9CSQ9L0Z',
};

initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
