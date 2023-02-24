import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    firstName: String,
    lastName: String
  },
  email: String,
  username: String,
  password: String,
  dateCreated: Date,
  links: [{ linkId: String, category: String }]
})
export default mongoose.model("User", userSchema);