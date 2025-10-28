import { db } from '../lib/firebase.js';

export default async function handler(req, res) {
  try {
    // Quick read to verify Firestore access (create a tiny doc on first run)
    const docRef = db.collection('meta').doc('healthcheck');
    await docRef.set({ last: new Date().toISOString() }, { merge: true });
    const snap = await docRef.get();
    res.status(200).json({ ok: true, data: snap.data() });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
}
