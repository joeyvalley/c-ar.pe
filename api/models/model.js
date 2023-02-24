import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
  title: String,
  links: [{
    title: String,
    link: String,
    img: String
  }]
})

const eventsSchema = new mongoose.Schema({
  title: String,
  year: Number,
  links: [{
    title: String,
    link: String,
    img: String
  }]
})

const deathSchema = new mongoose.Schema({
  name: String,
  year: Number,
  description: String,
  extract: String,
  link: String,
  img: String
})

const birthdaySchema = new mongoose.Schema({
  name: String,
  year: Number,
  description: String,
  extract: String,
  link: String,
  img: String
})

const selectionSchema = new mongoose.Schema({
  event: String,
  year: Number,
  links: [{
    title: String,
    link: String,
    img: String
  }]
})

const daySchema = new mongoose.Schema({
  date: String,
  selections: [selectionSchema],
  births: [birthdaySchema],
  deaths: [deathSchema],
  events: [eventsSchema],
  holidays: [holidaySchema],
  // features: [featuresSchema]
})

export default mongoose.model("Day", daySchema);