import mongoose from "../connection.js";

const userSchema = new mongoose.Schema({
  name: {
    firstName: String,
    lastName: String
  },
  email: String,
  username: String,
  password: String,
  dateCreated: Date,
  collection: [
    {
      id: String
    }
  ]
})

export default mongoose.model("User", userSchema);