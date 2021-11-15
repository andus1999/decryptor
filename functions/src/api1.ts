import * as functions from "firebase-functions";
import {getFirestore} from "firebase-admin/firestore";
import {getStorage} from "firebase-admin/storage";
import cors = require("cors");
import * as express from "express";
import {Request, Response, NextFunction} from "express";


const app = express();
const db = getFirestore();
const storage = getStorage();
const bucket = storage.bucket();

app.use(cors());

app.use("/api", async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header("key");
  if (apiKey == null) {
    res.status(401).json({
      error: "ACCESS_DENIED",
      info: "The request must contain the header 'key'.",
    });
  } else {
    const docRef = db.collection("users").doc(apiKey);
    const docSnap = await docRef.get();
    const userData = docSnap.data();
    if (userData != null) {
      res.locals.user = docSnap;
      if (userData.freeApiCalls > 0 || userData.paidApiCalls > 0) {
        if (userData.freeApiCalls > 0) {
          userData.freeApiCalls -= 1;
        } else {
          userData.paidApiCalls -= 1;
        }
        await docRef.update(userData);
        next();
      } else {
        res.status(403).json({error: "NO_API_CALLS_LEFT"});
      }
    } else {
      res.status(403).json({error: "FORBIDDEN", info: "API key invalid"});
    }
  }
});

app.get("/api/v1/coins", async (req: Request, res: Response) => {
  const coinRef = db.collection("predictions").limit(1);
  const docSnap = await coinRef.get();
  res.status(200).json(Object.keys(docSnap.docs[0].data()));
});

app.get("/api/v1/coins/:coin", async (req: Request, res: Response) => {
  const coinRef = db.collection("coins").doc(req.params.coin);
  const docSnap = await coinRef.get();
  if (docSnap.data() != null) {
    res.status(200).json(docSnap.data());
  } else {
    res.status(404).json({error: "NOT FOUND"});
  }
});

app.get("/api/v1/models", async (req: Request, res: Response) => {
  const coinRef = db.collection("models");
  const docSnap = await coinRef.get();
  const data = docSnap.docs.map((doc) => {
    return doc.data().model_id;
  });
  res.status(200).json(data);
});

app.get("/api/v1/models/:model", async (req: Request, res: Response) => {
  const coinRef = db.collection("models").doc(req.params.model);
  const docSnap = await coinRef.get();
  if (docSnap.data() != null) {
    res.status(200).json(docSnap.data());
  } else {
    res.status(404).json({error: "NOT FOUND"});
  }
});

app.get("/api/v1/predictions/:coin", async (req: Request, res: Response) => {
  const coinRef = db.collection("predictions").doc("main");
  const docSnap = await coinRef.get();
  const data = docSnap.data()?.[req.params.coin];
  if (data != null) {
    res.status(200).json(data);
  } else {
    res.status(404).json({error: "NOT FOUND"});
  }
});

app.get("/api/v1/predictions/:model/:coin",
    async (req: Request, res: Response) => {
      const coinRef = db.collection("predictions").doc(req.params.model);
      const docSnap = await coinRef.get();
      const data = docSnap.data()?.[req.params.coin];
      if (data != null) {
        res.status(200).json(data);
      } else {
        res.status(404).json({error: "NOT FOUND"});
      }
    });

app.get("/api/v1/historical-data/:coin",
    async (req: Request, res: Response) => {
      bucket
          .file("historical_data/" + req.params.coin + ".json")
          .download(function(err, contents) {
            if (err == null) {
              const data = JSON.parse(contents.toString());
              res.status(200).json(data);
            } else {
              res.status(404).json({error: "NOT FOUND"});
            }
          });
    });

export default functions.https.onRequest(app);
