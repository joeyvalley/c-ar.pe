// @ts-nocheck
const form = document.getElementById("login-form");

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const url = `http://localhost:3000/api/login/?user=${username}&password=${password}`
  const apiResponse = await fetch(url);
  const apiResponseJSON = await apiResponse.json();
  console.log(apiResponseJSON);
})