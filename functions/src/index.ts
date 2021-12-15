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
const dailyFreeApiCalls = 10000;

exports.api1 = api1;
exports.stripe = stripe;

exports.createUser = functions.auth.user().onCreate(async (user) => {
  const docRef = db.collection("users").doc(user.uid);
  const data = {
    name: user.displayName,
    email: user.email,
    uid: user.uid,
    freeApiCalls: dailyFreeApiCalls,
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

exports.refreshFreeApiCalls = functions.pubsub.schedule("every day 00:00").onRun(async () => {
  const batch = db.batch();
  const query = await db.collection("users").where("freeApiCalls", "<", dailyFreeApiCalls).get();
  query.forEach((d) => batch.update(d.ref, {freeApiCalls: dailyFreeApiCalls}));
  await batch.commit();
});
