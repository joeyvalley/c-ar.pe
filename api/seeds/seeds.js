// Import model (ᅌᴗᅌ* )
import Day from "../models/model.js";

// Clear the database. (ᅌᴗᅌ* )
// await Day.deleteMany();

// Create arrays to hold our month / day information for seeding. (ᅌᴗᅌ* )
const calendar = [{ month: "01", days: "31" }, { month: "02", days: 29 }, { month: "03", days: 31 }, { month: "04", days: 30 }, { month: "05", days: 31 }, { month: "06", days: 30 }, { month: "07", days: 31 }, { month: "08", days: 31 }, { month: "09", days: 30 }, { month: "10", days: 31 }, { month: "11", days: 31 }, { month: "12", days: 31 }];
const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

monthDelay(calendar, -1);

// Functions (ᅌᴗᅌ* )

async function monthDelay(calendar, monthCounter) {
  if (monthCounter === -1) {
    monthCounter++;
    console.log(`Searching ${monthArr[monthCounter]}.`);
    const dayCounter = 0;
    dayDelay(calendar[monthCounter].month, calendar[monthCounter].days, dayCounter);
    monthDelay(calendar, monthCounter);
  } else {
    setTimeout(() => {
      if (monthCounter < 11) {
        monthCounter++;
        console.log(`Searching ${monthArr[monthCounter]}.`);
        const dayCounter = 0;
        dayDelay(calendar[monthCounter].month, calendar[monthCounter].days, dayCounter);
        monthDelay(calendar, monthCounter);
      } else {
        console.log("All done!")
      }
    }, 330000)
  }
}

async function dayDelay(month, days, dayCounter) {
  setTimeout(() => {
    if (dayCounter < days) {
      dayCounter++;
      const date = month + "/" + String(dayCounter).padStart(2, "0");
      const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${String(dayCounter).padStart(2, '0')}`
      console.log(date, url);
      fetchData(date, url);
      dayDelay(month, days, dayCounter);
    } else {
      console.log(`Finished ${monthArr[month - 1]}.\n`);
    }
  }, 10000)
}

// Search the API for the current date and push it to our database. (ᅌᴗᅌ* )
async function fetchData(date, url) {
  try {
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
    return;
  } catch (error) {
    console.log(error)
  }
}

