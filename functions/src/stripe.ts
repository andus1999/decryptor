import * as functions from "firebase-functions";
import * as express from "express";
import {getFirestore} from "firebase-admin/firestore";
import {Request, Response} from "express";
import cors = require("cors");
import {Stripe} from "stripe";

const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: "2020-08-27",
});

const stripeTest = new Stripe("sk_test_51Jrpx0Ke5TUGpxZvbh8oLR7FbUsI3NzDgYGLAloaWU9Dlz0vgIA59jg7nfp6WrUZLXLWeveub9ekyxYyQVFBgL4D000qhla7JU", {
  apiVersion: "2020-08-27",
});
const app = express();
const db = getFirestore();

app.use(cors());

app.post("/stripe/intent/:mode", async (req: Request, res: Response) => {
  const {amount, currency, uid} = req.body;
  let paymentMethodTypes = ["card"];
  if (currency === "eur") {
    paymentMethodTypes = ["card", "sofort"];
  }
  const intent = {
    amount,
    currency,
    payment_method_types: paymentMethodTypes,
    metadata: {
      uid,
      amount,
      currency,
    },
  };
  let paymentIntent = null;
  if (req.params.mode === "live") {
    paymentIntent = await stripe.paymentIntents.create(intent);
  } else {
    paymentIntent = await stripeTest.paymentIntents.create(intent);
  }
  res.send(paymentIntent);
});

app.post("/stripe/webhook",
    express.json({type: "application/json"}), async (request, response) => {
      const event = request.body;

      switch (event.type) {
        case "payment_intent.succeeded": {
          const paymentIntent = event.data.object;
          const uid = paymentIntent.metadata.uid;
          const amount = parseInt(paymentIntent.metadata.amount);
          const docRef = db.collection("users").doc(uid);
          const data = (await docRef.get()).data();
          const paidApiCalls = parseInt(data?.paidApiCalls) + amount;
          await docRef.update({
            paidApiCalls,
          });
          break;
        }
        default: {
          functions.logger.log("Unhandled event", event.type);
        }
      }
      response.json({received: true});
    });

export default functions.https.onRequest(app);
