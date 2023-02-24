// Import models. (ᅌᴗᅌ* )
import Day from "../models/model.js";
import User from "../models/userModel.js";

// Get today's date. (ᅌᴗᅌ* )
const today = new Date();
const day = String(today.getDate()).padStart(2, "0");
const month = String(today.getMonth() + 1).padStart(2, '0');
const date = month + "/" + day

// FUNCTIONS (ᅌᴗᅌ* )
export async function birthdays(req, res) {
  const response = await Day.find({ date: date });
  res.json(response[0].births)
}

export async function login(req, res) {
  const user = await User.findOne({ username: req.query.user, password: req.query.password });
  if (user) {
    res.json(user);
  } else {
    res.json(user);
  }

}

export async function search(req, res) {
  const date = req.query.month + "/" + req.query.day;
  const searchResponse = await Day.find({ date: date });
  res.json(searchResponse);
}

export async function showAllUsers(req, res) {
  const users = await User.find();
  res.json(users);
}

export async function createUser(req, res) {
  const { name, email, username, password, dateCreated, collection } = req.body;
  try {
    const newUser = await User.create({
      name: {
        firstName: name.firstName,
        lastName: name.lastName
      },
      email: email,
      username: username,
      password: password,
      dateCreated: dateCreated,
      links: []
    })
    res.json(newUser);
  } catch (error) {
    res.json("Failed to create user.")
  }
}

export async function registerUser(req, res) {
  try {
    const newUser = await User.create({
      name: {
        firstName: req.query.first,
        lastName: req.query.last
      },
      email: req.query.email,
      username: req.query.user,
      password: req.query.password,
      dateCreated: new Date(),
      links: []
    })
    res.json(newUser);
  } catch (error) {
    res.json("Failed to create user.")
  }
}

export async function deleteUser(req, res) {
  const deletedUser = await User.findOneAndDelete({ username: req.params.username });
  res.json(deletedUser);
}