import express from "express";
import admin from "firebase-admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = express.Router();

import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET_KEY || "TEST";

router.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      name,
    });
    await user.save();

    const token = jwt.sign({ userId: user._id }, secret);
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 24);

    user.token = token;
    user.tokenExpiration = tokenExpiration;
    await user.save();

    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found.");
    }

    const isPasswordValid = bcrypt.compare(password, user.password as string);
    if (!isPasswordValid) {
      throw new Error("Invalid password.");
    }

    const token = jwt.sign({ userId: user._id }, secret);
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 24);

    user.token = token;
    user.tokenExpiration = tokenExpiration;
    await user.save();

    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
