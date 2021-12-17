import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import {config} from "dotenv";
config();

const serviceAccount = require("../decryptor-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://decryptor-329419.appspot.com",
});

import {getFirestore} from "firebase-admin/firestore";
import api1 from "./api1";
import stripe from "./stripe";
import {SMTPClient, Message} from "emailjs";

const db = getFirestore();
const dailyFreeApiCalls = 10000;
const mailClient = new SMTPClient({
  user: "noreply@decryptor.xyz",
  password: process.env.NOREPLY_PW,
  host: "smtppro.zoho.eu",
  tls: true,
});

const sendEmail = async (to: string, subject: string, body: string) => {
  const message = new Message({
    text: body,
    from: "noreply@decryptor.xyz",
    to,
    subject,
  });
  await mailClient.sendAsync(message);
};

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
  if (user.email != undefined) {
    sendEmail(
        user.email,
        "Welcome to decryptor",
        (user.displayName ? `Hello ${user.displayName}!` : "Hello!") +
        "\n\nWelcome to decryptor.\nThanks for signing up!" +
        "\n\nThanks,\nThe decryptor team",
    );
  }
  return;
});

exports.cleanupUser = functions.auth.user().onDelete(async (user) => {
  const docRef = db.collection("users").doc(user.uid);
  await docRef.delete();
  return;
});

exports.issueNotification = functions.firestore
    .document("aggregations/issues").onUpdate((change) => {
      Object.keys(change.after.data()).forEach((it) => {
        const newData = change.after.data()[it];
        const before = change.before.data()[it]?.length || 0;
        const after = newData.length;
        if (after > before) {
          sendEmail(
              "support@decryptor.xyz",
              "New issue",
              "A new issue has been added to the issues list:\n" +
              `${it}: ${JSON.stringify(newData[after - 1])}` +
              "\n\nPlease review it as soon as possible.",
          );
        }
      });
    });

exports.refreshFreeApiCalls = functions.pubsub.schedule("0 0 * * *")
    .timeZone("Etc/UTC")
    .onRun(async () => {
      const batch = db.batch();
      const query = await db.collection("users")
          .where("freeApiCalls", "<", dailyFreeApiCalls).get();
      query.forEach((d) => batch
          .update(d.ref, {freeApiCalls: dailyFreeApiCalls}));
      await batch.commit();
    });
