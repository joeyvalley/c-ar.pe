// @ts-nocheck
// Import model. (ᅌᴗᅌ* )
import "dotenv/config";
import mongoose from "mongoose";
import Day from "../models/model.js";

mongoose.connect(process.env.DATABASE_URL);
mongoose.set("strictQuery", true);

// Get today's date. (ᅌᴗᅌ* ) 
const today = new Date();
const day = String(today.getDate()).padStart(2, "0");
const month = String(today.getMonth() + 1).padStart(2, '0');
const date = month + "/" + day

await Day.remove({ date: date });

// Construct the URL and request the data from the API.
const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${date}`;
const res = await fetch(url);
const jsonResponse = await res.json();
const { selected, births, deaths, events, holidays } = jsonResponse;

// Pull out the desired information from the JSON responses. (ᅌᴗᅌ* )

// SELECTIONS //
const selectionsJSON = [];
selected.forEach(selection => {
  const { text, pages, year } = selection;
  const pagesArr = [];
  pages.forEach(page => {
    if (page.originalimage === undefined) {
      pagesArr.push({ title: page.titles.normalized, link: page.content_urls.desktop.page, img: "" });
    }
    else {
      pagesArr.push({ title: page.titles.normalized, link: page.content_urls.desktop.page, img: page.originalimage.source });
    }

  })
  selectionsJSON.push({ event: text, year: year, links: pagesArr });
})

// BIRTHDAYS //
const birthsJSON = [];
births.forEach(birth => {
  if (birth.pages[0].originalimage === undefined) {
    birthsJSON.push({ name: birth.pages[0].titles.normalized, year: birth.year, description: birth.text, extract: birth.pages[0].extract, link: birth.pages[0].content_urls.desktop.page, img: "" })
  } else {
    birthsJSON.push({ name: birth.pages[0].titles.normalized, year: birth.year, description: birth.text, extract: birth.pages[0].extract, link: birth.pages[0].content_urls.desktop.page, img: birth.pages[0].originalimage.source })
  }
});

// DEATHS //
const deathsJSON = [];
deaths.forEach(death => {
  if (death.pages[0].originalimage === undefined) {
    deathsJSON.push({ name: death.pages[0].titles.normalized, year: death.year, description: death.text, extract: death.pages[0].extract, link: death.pages[0].content_urls.desktop.page, img: "" })
  } else {
    deathsJSON.push({ name: death.pages[0].titles.normalized, year: death.year, description: death.text, extract: death.pages[0].extract, link: death.pages[0].content_urls.desktop.page, img: death.pages[0].originalimage.source })
  }
});

// NEWS //
const eventsJSON = [];
events.forEach(event => {
  const { text, pages, year } = event;
  const pagesArr = [];
  pages.forEach(page => {
    if (page.originalimage === undefined) {
      pagesArr.push({ title: page.titles.normalized, link: page.content_urls.desktop.page, img: "" });
    }
    else {
      pagesArr.push({ title: page.titles.normalized, link: page.content_urls.desktop.page, img: page.originalimage.source });
    }
  })
  eventsJSON.push({ title: text, year: year, links: pagesArr });
});

// HOLIDAYS //
const holidaysJSON = [];
holidays.forEach(holiday => {
  const { text, pages } = holiday;
  const pagesArr = [];
  pages.forEach(page => {
    if (page.originalimage === undefined) {
      pagesArr.push({ title: page.titles.normalized, link: page.content_urls.desktop.page, img: "" });
    }
    else {
      pagesArr.push({ title: page.titles.normalized, link: page.content_urls.desktop.page, img: page.originalimage.source });
    }
  })
  holidaysJSON.push({ title: text, links: pagesArr });
});

// Add our entry to the database. (ᅌᴗᅌ* )
await Day.create({ date: date, selections: selectionsJSON, births: birthsJSON, deaths: deathsJSON, events: eventsJSON, holidays: holidaysJSON });

mongoose.disconnect(process.env.DATABASE_URL);