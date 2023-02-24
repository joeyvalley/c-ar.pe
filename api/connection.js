import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost/carpe-diem")

export default mongoose;