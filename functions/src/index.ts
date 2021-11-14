import * as functions from "firebase-functions";
import admin = require("firebase-admin");

const serviceAccount = require("../decryptor-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://decryptor-329419.appspot.com",
});

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
