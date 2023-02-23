const form = document.getElementById("login-form");

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const first = document.getElementById("fname").value;
  const last = document.getElementById("lname").value;
  const email = document.getElementById("e-mail").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const url = `http://localhost:8080/api/register/?first=${first}&last=${last}&email=${email}&user=${username}&password=${password}`
  const apiResponse = await fetch(url);
  const apiResponseJSON = await apiResponse.json();
  console.log(apiResponseJSON);
})