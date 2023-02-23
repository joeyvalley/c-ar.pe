// Import model. (ᅌᴗᅌ* )
import Day from "../models/model.js";

// Get today's date. (ᅌᴗᅌ* )
const today = new Date();
const day = String(today.getDate()).padStart(2, "0");
const month = String(today.getMonth() + 1).padStart(2, '0');
const date = month + "/" + day

// FUNCTIONS (ᅌᴗᅌ* )
export async function birthdays(req, res) {
  const response = await Day.find({ date: date });
  res.json(response[0].births)
}

export async function search(req, res) {
  const date = req.query.month + "/" + req.query.day;
  const searchResponse = await Day.find({ date: date });
  res.json(searchResponse);
}