import express from "express";
import { db } from "../lib/firebase.js";
// import { collection } from "firebase-admin/firestore";

const app = express();

app.use(express.json());

// Test route that saves a split session
app.post("/split-session", async (req, res) => {
  try {
    const { orderId, participants } = req.body;
    const docRef = await db.collection("splitSessions").add({
      orderId,
      participants,
      createdAt: new Date(),
    });
    res.status(200).json({ success: true, id: docRef.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save session" });
  }
});

export default app;
