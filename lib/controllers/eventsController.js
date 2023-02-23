import Day from "../models/model.js";

export async function index(req, res) {
  console.log("Requesting the event page.");
  const searchResults = await Day.find();
  const events = searchResults[0].events;
  const selections = searchResults[0].selections;
  const resultsArr = [];
  events.forEach(event => {
    resultsArr.push(event);
  })
  selections.forEach(event => {
    resultsArr.push(event);
  })
  resultsArr.sort((a, b) => b.year - a.year);
  res.json(resultsArr);
}