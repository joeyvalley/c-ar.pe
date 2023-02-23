// Create our date variables for use throughout the script.
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
calendar.value = inputVal;
calendar.max = inputVal;
calendar.min = minVal;

// Add event listeners to the submit button to change the cursor style when hovering.
btn?.addEventListener('mouseover', () => {
  btn.classList.add("hover");
})
btn?.addEventListener('mouseout', () => {
  btn.classList.remove("hover");
})

// Add event listener to the form in order to make API calls.
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const month = calendar.value.split("-")[1];
  const day = calendar.value.split("-")[2];
  const searchURL = `http://localhost:8080/api/search/?month=${month}&day=${day}`;
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
