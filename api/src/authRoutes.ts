import express from "express";
import admin from "firebase-admin";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    console.log(req);
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({ email, password });
    res.json(userRecord);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().getUserByEmail(email);
    if (!userRecord) {
      throw new Error("User not found.");
    }
    const token = await admin.auth().createCustomToken(userRecord.uid);
    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
