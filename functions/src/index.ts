import admin = require("firebase-admin");

const serviceAccount = require("../decryptor-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://decryptor-329419.appspot.com",
});

import {initializeApp} from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCN1w6Nd5zIPH_qzjyBCtn9Lg4ZMR1d8pU",
  authDomain: "decryptor-329419.firebaseapp.com",
  projectId: "decryptor-329419",
  storageBucket: "decryptor-329419.appspot.com",
  messagingSenderId: "1078715077596",
  appId: "1:1078715077596:web:ec351ff6f73b27787d3519",
  measurementId: "G-2C9CSQ9L0Z",
};

initializeApp(firebaseConfig);

import * as functions from "firebase-functions";
import {getFirestore} from "firebase-admin/firestore";
import api1 from "./api1";
import stripe from "./stripe";

const db = getFirestore();

exports.api1 = api1;
exports.stripe = stripe;

exports.createUser = functions.auth.user().onCreate(async (user) => {
  const docRef = db.collection("users").doc(user.uid);
  const data = {
    name: user.displayName,
    email: user.email,
    uid: user.uid,
    freeApiCalls: 100,
    paidApiCalls: 0,
  };
  await docRef.set(data);
  return;
});

exports.cleanupUser = functions.auth.user().onDelete(async (user) => {
  const docRef = db.collection("users").doc(user.uid);
  await docRef.delete();
  return;
});
