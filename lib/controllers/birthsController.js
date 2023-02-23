// Import database model. (ᅌᴗᅌ* )
import Day from "../models/model.js";

// Create references for dates and months information. (ᅌᴗᅌ* )
const calendar = [{ month: "01", days: "31" }, { month: "02", days: 29 }, { month: "03", days: 31 }, { month: "04", days: 30 }, { month: "05", days: 31 }, { month: "06", days: 30 }, { month: "07", days: 31 }, { month: "08", days: 31 }, { month: "09", days: 30 }, { month: "10", days: 31 }, { month: "11", days: 31 }, { month: "12", days: 31 }];
const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export async function index(req, res) {
  res.json("Birthdays endpoint.")
}
// Search the database for a particular birthday. (ᅌᴗᅌ* )
export async function searchByDate(req, res) {
  const day = req.params.date.split("-")[1];
  const month = monthArr[+req.params.date.split("-")[0] - 1];
  const year = +(req.params.date).split("-")[2]
  const dateString = (req.params.date).split("-")[0] + "/" + (req.params.date).split("-")[1];
  console.log("Searching for all birthdays on " + month + " " + day + ", " + year + ".");
  try {
    const searchResults = await Day.aggregate([{ $match: { date: dateString } }, { $project: { births: { $filter: { input: "$births", as: "b", cond: { $eq: ["$$b.year", year] } } } } }]);
    res.json(searchResults);
  } catch (error) { res.json(error); }
}

export async function searchByYear(req, res) {
  try {
    const searchResults = await Day.aggregate([{ $unwind: "$births" }, { $match: { "births.year": +req.params.year } }, { $project: { births: 1 } }]);
    res.json(searchResults);
  } catch (error) { res.json(error); }
}

export async function searchByName(req, res) {
  try {
    const searchResults = await Day.aggregate([{ $unwind: "$births" }, { $match: { "births.name": req.params.name } }, { $project: { births: 1 } }]);
    res.json(searchResults);
  } catch (error) { res.json(error); }
}

// Add an entry for a particular date. (ᅌᴗᅌ* )
export async function add(req, res) {
  const date = req.body.date;
  const entry = req.body.births;
  const postResult = await Day.updateOne({ date: date }, { $push: { births: entry } })
  if (postResult.modifiedCount === 1) {
    const message = { message: "Added the following entry", entry: entry };
    res.json(message);
  } else { res.json("Failed to add entry.") }
}

// Edit a birthday by name. (ᅌᴗᅌ* )
export async function edit(req, res) {
  const link = req.body.link;
  const response = await Day.updateOne({ "births.name": req.params.name }, { $set: { "births.$.link": link } });
  res.json(response);
}

// Remove a birthday by name. (ᅌᴗᅌ* )
export async function remove(req, res) {
  const entry = await Day.updateMany({ "births.name": req.params.name }, { $pull: { births: { name: req.params.name } } });
  res.json(entry);
}