// Global variables.
const today = new Date();
const day = String(today.getDate());
const month = String(today.getMonth() + 1).padStart(2, '0');
const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthStr = monthArr[+month - 1];
const year = today.getFullYear();

const form = document.getElementById("calendarForm");
const calendar = document.getElementById("calendar");
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const month = calendar.value.split("-")[1];
  const day = calendar.value.split("-")[2];
  const searchURL = `http://localhost:8080/api/search/?month=${month}&day=${day}`;
  const res = await fetch(searchURL);
  const json = await res.json();
  console.log(json);
})

