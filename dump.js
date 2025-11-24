import admin from "firebase-admin";
import fs from "fs";

admin.initializeApp({
  credential: admin.credential.cert("./fucapiweb-firebase-adminsdk.json"),
  databaseURL: "https://fucapiweb-default-rtdb.firebaseio.com",
});

async function dump() {
  const snap = await admin.database().ref("/").once("value");
  console.log(JSON.stringify(snap.val(), null, 2));
}

dump();
