// Create our date variables for use throughout the script.
// @ts-nocheck
const today = new Date();
const day = String(today.getDate());
const month = String(today.getMonth() + 1).padStart(2, '0');
const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const monthStr = monthArr[+month - 1];
const year = today.getFullYear();


// Select elements from the DOM for manipulation.
const form = document.getElementById("calendarForm");
const calendar = document.getElementById("calendar");
const btn = document.getElementById("submitBtn");
const login = document.getElementById("login");

// Set the values for the calendar input.
const inputVal = year + "-" + month + "-" + day;
const minVal = +(year - 1) + "-" + month + "-" + day;
// @ts-ignore
calendar.value = inputVal;
// @ts-ignore
calendar.max = inputVal;
// @ts-ignore
calendar.min = minVal;

// Add event listeners to the submit button to change the cursor style when hovering.
btn?.addEventListener('mouseover', () => {
  btn.classList.add("hover");
})
btn?.addEventListener('mouseout', () => {
  btn.classList.remove("hover");
})

// Add event listener to the form in order to make API calls.
// @ts-ignore
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  // @ts-ignore
  const month = calendar.value.split("-")[1];
  // @ts-ignore
  const day = calendar.value.split("-")[2];
  const searchURL = `http://localhost:3000/api/search/?month=${month}&day=${day}`;
  const res = await fetch(searchURL);
  const json = await res.json();
  console.log(json);
})

// Add event listeners to the login to make it appear as a link.
login?.addEventListener('click', () => {
  window.location.href = "/register";
})
login?.addEventListener('mouseover', () => {
  login.classList.add("fake-link");
})
login?.addEventListener('mouseout', () => {
  login.classList.remove("fake-link");
})
