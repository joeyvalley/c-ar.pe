// @ts-nocheck
// Import model. (ᅌᴗᅌ* )
import "dotenv/config";
import mongoose from "mongoose";
import Day from "../models/model.js";

mongoose.connect(process.env.DATABASE_URL);
mongoose.set("strictQuery", true);


mongoose.disconnect(process.env.DATABASE_URL);